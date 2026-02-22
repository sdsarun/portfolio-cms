export const Messages = {
  common: {
    toast: {
      saved: "Your changes have been saved"
    },
    dialog: {
      confirmDelete: "Delete",
      cancel: "Cancel"
    }
  },
  settings: {
    validation: {
      currentPasswordRequired: "Current password is required",
      newPasswordRequired: "New password is required",
      confirmPasswordRequired: "Please confirm your new password",
      newPasswordMustDiffer: "New password must be different from current password",
      passwordsDoNotMatch: "Passwords do not match"
    },
    toast: {
      passwordUpdatedFallback: "Password updated"
    }
  },
  work: {
    validation: {
      startMonthFormat: "Start month must be YYYY-MM",
      endMonthFormat: "End month must be YYYY-MM",
      endMonthWhenInProgress: "End month must be empty when project is in progress",
      imageUrlInvalid: "Project image must be a valid image URL",
      attachmentMaxSize: "Attachment must be 5MB or smaller",
      linkNameRequired: "Link name is required",
      linkUrlRequired: "Link URL is required",
      linkUrlInvalid: "Link URL must be valid"
    },
    dialog: {
      deleteProjectTitle: "Delete Project?",
      deleteProjectLinkTitle: "Delete Project Link?",
      deleteProjectImageTitle: "Delete Project Image?"
    }
  },
  contact: {
    dialog: {
      deleteItemTitle: "Delete Contact Item?"
    }
  },
  resume: {
    dialog: {
      deleteRoleTitle: "Delete Role?",
      deleteCategoryTitle: "Delete Category?",
      deleteEducationTitle: "Delete Education?",
      deleteCertificationTitle: "Delete Certification?"
    }
  },
  apiKeys: {
    validation: {
      nameRequired: "Key name is required"
    },
    toast: {
      created: "API key created",
      revoked: "API key revoked",
      revokeFailed: "Failed to revoke API key",
      deleted: "API key deleted",
      copied: "Copied to clipboard",
      copyFailed: "Could not copy. Please select and copy manually."
    },
    dialog: {
      deleteTitle: "Delete API Key?",
      revokeTitle: "Revoke API Key?",
      revokeConfirm: "Revoke"
    }
  }
} as const;
