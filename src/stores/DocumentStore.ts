import { create } from 'zustand';

type Member = {
  id: string;
  name: string;
};

type Document = {
  id: string;
  name: string;
  members: Member[];
};

type DocumentStore = {
  documents: Document[];
  addDocument: (doc: Omit<Document, 'members'>) => void;
  removeDocument: (docId: string) => void;
  addMember: (docId: string, member: Member) => void;
  removeMember: (docId: string, memberId: string) => void;
};

export const useDocumentStore = create<DocumentStore>(set => ({
  documents: [],
  addDocument: doc =>
    set(state => ({
      documents: [...state.documents, { ...doc, members: [] }],
    })),
  removeDocument: docId =>
    set(state => ({
      documents: state.documents.filter(d => d.id !== docId),
    })),
  addMember: (docId, member) =>
    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              members: [...doc.members, member],
            }
          : doc
      ),
    })),
  removeMember: (docId, memberId) =>
    set(state => ({
      documents: state.documents.map(doc =>
        doc.id === docId
          ? {
              ...doc,
              members: doc.members.filter(m => m.id !== memberId),
            }
          : doc
      ),
    })),
}));
