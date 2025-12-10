interface Message<U = any> {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  conversation: {uuid: string};
  from: U;
  to: U;
  message: string;
  type: string;
  status: string;
  offer: {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    price: number;
    description: string;
    pictures: string;
    status: string;
    currentOffer?: {uuid: string};
    declinedReason: string;
    declinedReasonCategory: string;
    cancelledReason: string;
    cancelledReasonCategory: string;
    counterReason: string;
  };
}
