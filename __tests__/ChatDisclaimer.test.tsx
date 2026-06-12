import React from 'react';
import ReactTestRenderer, {act} from 'react-test-renderer';

const mockHide = jest.fn();

jest.mock('react-native-actions-sheet', () => {
  const ReactImpl = require('react');
  const {ScrollView: RNScrollView} = require('react-native');
  return {
    __esModule: true,
    default: ({children}: {children: React.ReactNode}) =>
      ReactImpl.createElement(ReactImpl.Fragment, null, children),
    ScrollView: RNScrollView,
    SheetManager: {
      hide: (...args: unknown[]) => mockHide(...args),
      show: jest.fn(),
    },
    registerSheet: jest.fn(),
  };
});

jest.mock('react-native-vector-icons/AntDesign', () => {
  return {__esModule: true, default: () => null};
});

jest.mock('../src/shared/Scaling', () => ({
  scale: (n: number) => n,
  verticalScale: (n: number) => n,
  moderateScale: (n: number) => n,
}));

jest.mock('../src/components/button/MainButton', () => {
  const ReactImpl = require('react');
  const {Pressable, Text} = require('react-native');
  return {
    __esModule: true,
    default: ({
      onPress,
      children,
    }: {
      onPress?: () => void;
      children?: React.ReactNode;
    }) =>
      ReactImpl.createElement(
        Pressable,
        {onPress, testID: 'agree-button'},
        ReactImpl.createElement(Text, null, children),
      ),
  };
});

jest.mock('../src/components/container/Index', () => {
  const ReactImpl = require('react');
  const {View} = require('react-native');
  return {
    __esModule: true,
    default: ({children}: {children?: React.ReactNode}) =>
      ReactImpl.createElement(View, null, children),
  };
});

jest.mock('../src/components/Typography', () => {
  const ReactImpl = require('react');
  const {Text} = require('react-native');
  return {
    __esModule: true,
    default: ({children}: {children?: React.ReactNode}) =>
      ReactImpl.createElement(Text, null, children),
  };
});

import ChatDisclaimer from '../src/screens/app/chat/components/ChatDisclaimer';

type Renderable = ReturnType<typeof ReactTestRenderer.create>;

const collectText = (node: unknown): string[] => {
  if (node == null) return [];
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(collectText);
  if (typeof node === 'object' && 'children' in (node as Record<string, unknown>)) {
    return collectText((node as {children: unknown}).children);
  }
  return [];
};

const renderSheet = (onAgree?: jest.Mock): Renderable => {
  let tree!: Renderable;
  act(() => {
    tree = ReactTestRenderer.create(
      // @ts-expect-error — SheetProps shape doesn't matter for this unit test
      <ChatDisclaimer payload={onAgree ? {onAgree} : undefined} />,
    );
  });
  return tree;
};

describe('ChatDisclaimer', () => {
  beforeEach(() => {
    mockHide.mockClear();
  });

  it('renders the full policy body, not just the header and button', () => {
    const tree = renderSheet();
    const text = collectText(tree.toJSON()).join(' ');

    // Header + CTA — these were the only things visible in the bug screenshot.
    expect(text).toContain('Safety & Communication Policy');
    expect(text).toContain('Agree and Continue');

    // Body paragraphs — these were collapsed/invisible in the bug.
    expect(text).toContain('communication between users and service providers');
    expect(text).toContain('Do not send or accept links');
    expect(text).toContain('please do not share your phone number');
    expect(text).toContain('Abuse of the platform may lead to account restrictions');
  });

  it('only fires onAgree when "Agree and Continue" is pressed, not when dismissed', () => {
    const onAgree = jest.fn();
    const tree = renderSheet(onAgree);

    const pressables = tree.root.findAll(
      node => typeof (node.props as {onPress?: unknown})?.onPress === 'function',
    );

    // Composite + host elements share the same onPress reference; dedupe by identity
    // so we count one logical button per unique handler.
    const handlers = new Set<() => void>();
    for (const node of pressables) {
      handlers.add((node.props as {onPress: () => void}).onPress);
    }

    expect(handlers.size).toBeGreaterThanOrEqual(2);

    let agreeFiringPresses = 0;
    for (const handler of handlers) {
      onAgree.mockClear();
      mockHide.mockClear();
      act(() => handler());
      if (onAgree.mock.calls.length > 0) agreeFiringPresses += 1;
      // Every press path closes the sheet — including dismissal.
      expect(mockHide).toHaveBeenCalledWith('ChatDisclaimer');
    }

    // Exactly one handler may invoke onAgree — the Agree button.
    expect(agreeFiringPresses).toBe(1);
  });

  it('does nothing harmful when no onAgree handler is supplied', () => {
    const tree = renderSheet();

    const agreeButton = tree.root.findByProps({testID: 'agree-button'});
    expect(() => act(() => agreeButton.props.onPress())).not.toThrow();
    expect(mockHide).toHaveBeenCalledWith('ChatDisclaimer');
  });
});
