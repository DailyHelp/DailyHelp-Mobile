interface Conversation {
  conversationId: string;
  serviceProviderId: string;
  spFirstname: string;
  spLastname: string;
  spMiddlename: string;
  rqFirstname: string;
  rqLastname: string;
  rqMiddlename: string;
  lastMessageId: string;
  lastMessage: string;
  offerDescription: string;
  offerPrice: number;
  status: string;
  lastLockedAt: string;
  locked: boolean;
  restricted: boolean;
  cancellationChances: number;
  createdAt: string;
  iReadLastMessage?: boolean;
  spOnline?: boolean;
  spTier?: string;
  srOnline?: boolean;
}
