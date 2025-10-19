import { create } from 'zustand';
export const useDocumentStore = create(set => ({
    documents: [],
    addDocument: doc => set(state => ({
        documents: [...state.documents, { ...doc, members: [] }],
    })),
    removeDocument: docId => set(state => ({
        documents: state.documents.filter(d => d.id !== docId),
    })),
    addMember: (docId, member) => set(state => ({
        documents: state.documents.map(doc => doc.id === docId
            ? {
                ...doc,
                members: [...doc.members, member],
            }
            : doc),
    })),
    removeMember: (docId, memberId) => set(state => ({
        documents: state.documents.map(doc => doc.id === docId
            ? {
                ...doc,
                members: doc.members.filter(m => m.id !== memberId),
            }
            : doc),
    })),
}));
