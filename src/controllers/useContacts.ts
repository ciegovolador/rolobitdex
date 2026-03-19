import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import {
  getAllContacts,
  searchContacts,
  createContactIdempotent,
  type Contact,
} from "../models/contact";

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const loadContacts = useCallback(async (q: string) => {
    const results = q.trim()
      ? await searchContacts(q.trim())
      : await getAllContacts();
    setContacts(results);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadContacts(query);
    }, [query, loadContacts])
  );

  const search = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const create = useCallback(
    async (name: string): Promise<string> => {
      setLoading(true);
      try {
        const id = await createContactIdempotent(name);
        await loadContacts(query);
        return id;
      } finally {
        setLoading(false);
      }
    },
    [query, loadContacts]
  );

  return { contacts, query, search, create, loading } as const;
}
