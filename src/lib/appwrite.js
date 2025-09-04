import { Client, Account, Databases, Storage, ID } from 'appwrite';

// Appwrite configuration
export const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '68b95e19001efb0ef952');

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Export ID for document creation
export { ID };

// Database and collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'vinevault-db';
export const COLLECTIONS = {
    USERS: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || 'users',
    VINEYARDS: process.env.NEXT_PUBLIC_APPWRITE_VINEYARDS_COLLECTION_ID || 'vineyards',
    INVESTMENTS: process.env.NEXT_PUBLIC_APPWRITE_INVESTMENTS_COLLECTION_ID || 'investments',
    TRANSACTIONS: process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID || 'transactions',
    AUDIT_LOGS: process.env.NEXT_PUBLIC_APPWRITE_AUDIT_LOGS_COLLECTION_ID || 'audit-logs'
};

// Storage bucket ID
export const STORAGE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || 'vineyard-images';

// Helper function to handle Appwrite errors
export const handleAppwriteError = (error) => {
    console.error('Appwrite Error:', error);
    
    if (error.code === 401) {
        return 'Invalid credentials. Please check your email and password.';
    }
    if (error.code === 409) {
        return 'An account with this email already exists.';
    }
    if (error.code === 429) {
        return 'Too many requests. Please try again later.';
    }
    if (error.type === 'user_invalid_credentials') {
        return 'Invalid email or password.';
    }
    if (error.type === 'user_email_already_exists') {
        return 'An account with this email already exists.';
    }
    if (error.type === 'user_password_mismatch') {
        return 'Password is incorrect.';
    }
    
    return error.message || 'An unexpected error occurred.';
};

// Authentication helper functions
export const authService = {
    // Create account
    async createAccount(email, password, name) {
        try {
            console.log('authService: Creating account for', email);
            const response = await account.create(ID.unique(), email, password, name);
            console.log('authService: Account created successfully', response);
            return response;
        } catch (error) {
            console.error('authService: Account creation failed', error);
            throw new Error(handleAppwriteError(error));
        }
    },

    // Login
    async login(email, password) {
        try {
            const session = await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const user = await account.get();
            return user;
        } catch (error) {
            // No active session or error getting user
            return null;
        }
    },

    // Logout
    async logout() {
        try {
            await account.deleteSession('current');
            return true;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Send email verification
    async sendVerification() {
        try {
            const result = await account.createVerification(`${window.location.origin}/auth/verify-email`);
            return result;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Verify email
    async verifyEmail(userId, secret) {
        try {
            const result = await account.updateVerification(userId, secret);
            return result;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Send password recovery
    async sendPasswordRecovery(email) {
        try {
            const result = await account.createRecovery(email, `${window.location.origin}/auth/reset-password`);
            return result;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Reset password
    async resetPassword(userId, secret, password) {
        try {
            const result = await account.updateRecovery(userId, secret, password);
            return result;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    }
};

// Database helper functions
export const databaseService = {
    // Create document
    async createDocument(collectionId, documentId, data, permissions = []) {
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                collectionId,
                documentId,
                data,
                permissions
            );
            return response;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Get document
    async getDocument(collectionId, documentId) {
        try {
            const response = await databases.getDocument(DATABASE_ID, collectionId, documentId);
            return response;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // List documents
    async listDocuments(collectionId, queries = []) {
        try {
            const response = await databases.listDocuments(DATABASE_ID, collectionId, queries);
            return response;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Update document
    async updateDocument(collectionId, documentId, data, permissions = []) {
        try {
            const response = await databases.updateDocument(
                DATABASE_ID,
                collectionId,
                documentId,
                data,
                permissions
            );
            return response;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Delete document
    async deleteDocument(collectionId, documentId) {
        try {
            await databases.deleteDocument(DATABASE_ID, collectionId, documentId);
            return true;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    }
};

// Storage helper functions
export const storageService = {
    // Upload file
    async uploadFile(fileId, file, permissions = []) {
        try {
            const response = await storage.createFile(STORAGE_BUCKET_ID, fileId, file, permissions);
            return response;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Get file
    async getFile(fileId) {
        try {
            const response = await storage.getFile(STORAGE_BUCKET_ID, fileId);
            return response;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    },

    // Get file preview
    getFilePreview(fileId, width = 400, height = 400, gravity = 'center', quality = 100) {
        return storage.getFilePreview(STORAGE_BUCKET_ID, fileId, width, height, gravity, quality);
    },

    // Get file download
    getFileDownload(fileId) {
        return storage.getFileDownload(STORAGE_BUCKET_ID, fileId);
    },

    // Delete file
    async deleteFile(fileId) {
        try {
            await storage.deleteFile(STORAGE_BUCKET_ID, fileId);
            return true;
        } catch (error) {
            throw new Error(handleAppwriteError(error));
        }
    }
};

export default client;