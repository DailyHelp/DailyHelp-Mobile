interface Message {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
  conversation: string;
  from: string;
  to: string;
  message: string;
  type: string;
  status: string;
  offer: {
    uuid: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
    price: string;
    description: string;
    pictures: string;
    status: string;
    currentOffer: string;
    declinedReason: string;
    declinedReasonCategory: string;
    cancelledReason: string;
    cancelledReasonCategory: string;
    counterReason: string;
  };
}
