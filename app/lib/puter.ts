import { create } from "zustand";

declare global {
    interface Window {
        puter: any;
    }
}

interface PuterStore {
    isLoading: boolean;
    auth: {
        user: any | null;
        isAuthenticated: boolean;
        signIn: () => Promise<void>;
        signOut: () => Promise<void>;
        checkAuthStatus: () => Promise<boolean>;
    };
    fs: {
        read: (path: string) => Promise<Blob | undefined>;
        upload: (files: File[] | Blob[]) => Promise<any>;
        delete: (path: string) => Promise<void>;
    };
    kv: {
        get: (key: string) => Promise<string | null>;
        set: (key: string, value: string) => Promise<boolean>;
        delete: (key: string) => Promise<boolean>;
        list: (pattern: string, returnValues?: boolean) => Promise<string[]>;
    };
    error: string | null;
    init: () => void;
}

export const usePuterStore = create<PuterStore>((set, get) => {
    const setError = (msg: string) => {
        set({
            error: msg,
            isLoading: false,
        });
    };

    const checkAuthStatus = async (): Promise<boolean> => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return false;
        }

        set({ isLoading: true, error: null });

        try {
            const isSignedIn = await puter.auth.isSignedIn();
            if (isSignedIn) {
                const user = await puter.auth.getUser();
                set({
                    auth: {
                        user,
                        isAuthenticated: true,
                        signIn,
                        signOut,
                        checkAuthStatus,
                    },
                    isLoading: false,
                });
                return true;
            } else {
                set({
                    auth: {
                        user: null,
                        isAuthenticated: false,
                        signIn,
                        signOut,
                        checkAuthStatus,
                    },
                    isLoading: false,
                });
                return false;
            }
        } catch (err) {
            const msg =
                err instanceof Error ? err.message : "Failed to check auth status";
            setError(msg);
            return false;
        }
    };

    const signIn = async (): Promise<void> => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }

        set({ isLoading: true, error: null });

        try {
            await puter.auth.signIn();
            await checkAuthStatus();
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Sign in failed";
            setError(msg);
        }
    };

    const signOut = async (): Promise<void> => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }

        set({ isLoading: true, error: null });

        try {
            await puter.auth.signOut();
            set({
                auth: {
                    user: null,
                    isAuthenticated: false,
                    signIn,
                    signOut,
                    checkAuthStatus,
                },
                isLoading: false,
            });
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Sign out failed";
            setError(msg);
        }
    };

    const read = async (path: string) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.read(path);
    };

    const upload = async (files: File[] | Blob[]) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.upload(files);
    };

    const deleteFile = async (path: string) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.fs.delete(path);
    };

    const getKV = async (key: string) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.get(key);
    };

    const setKV = async (key: string, value: string) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.set(key, value);
    };

    const deleteKV = async (key: string) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.delete(key);
    };

    const listKV = async (pattern: string, returnValues?: boolean) => {
        const { puter } = window;
        if (!puter) {
            setError("Puter.js not available");
            return;
        }
        return puter.kv.list(pattern, returnValues);
    };

    const init = (): void => {
        const { puter } = window;
        if (puter) {
            checkAuthStatus();
            return;
        }

        const interval = setInterval(() => {
            if (window.puter) {
                clearInterval(interval);
                checkAuthStatus();
            }
        }, 100);
    };

    return {
        isLoading: true,
        auth: {
            user: null,
            isAuthenticated: false,
            signIn,
            signOut,
            checkAuthStatus,
        },
        fs: {
            read,
            upload,
            delete: deleteFile,
        },
        kv: {
            get: getKV,
            set: setKV,
            delete: deleteKV,
            list: listKV,
        },
        error: null,
        init,
    };
});