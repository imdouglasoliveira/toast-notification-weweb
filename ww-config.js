export default {
  editor: {
    label: {
      en: "Toast Notification Host",
      pt: "Host de Notificações Toast",
    },
    icon: "fontawesome/solid/bell",
  },
  properties: {
    defaultDuration: {
      label: {
        en: "Default Duration (ms)",
        pt: "Duração Padrão (ms)",
      },
      type: "Number",
      defaultValue: 5000,
      section: "settings",
    },
    position: {
      label: {
        en: "Position",
        pt: "Posição",
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "top-right", label: "Top Right" },
          { value: "top-left", label: "Top Left" },
          { value: "bottom-right", label: "Bottom Right" },
          { value: "bottom-left", label: "Bottom Left" },
        ],
      },
      defaultValue: "top-right",
      section: "settings",
    },
    maxToasts: {
      label: {
        en: "Max Toasts",
        pt: "Máximo de Toasts",
      },
      type: "Number",
      defaultValue: 5,
      section: "settings",
    },
    language: {
      label: {
        en: "Language",
        pt: "Idioma",
      },
      type: "TextSelect",
      options: {
        options: [
          { value: "en", label: "English (US)" },
          { value: "pt", label: "Português (BR)" },
        ],
      },
      defaultValue: "en",
      section: "settings",
    },
    showTimestamp: {
      label: {
        en: "Show Timestamp",
        pt: "Exibir Horário",
      },
      type: "OnOff",
      defaultValue: true,
      section: "settings",
    },
    showEditorPlaceholder: {
      label: {
        en: "Show Editor Placeholder",
        pt: "Exibir Placeholder do Editor",
      },
      type: "OnOff",
      defaultValue: true,
      section: "settings",
    },
    successBackgroundColor: {
      label: { en: "Success Background", pt: "Fundo Sucesso" },
      type: "Color",
      defaultValue: "#d1fae5",
      section: "settings",
    },
    successBorderColor: {
      label: { en: "Success Border", pt: "Borda Sucesso" },
      type: "Color",
      defaultValue: "#10b981",
      section: "settings",
    },
    successTextColor: {
      label: { en: "Success Text", pt: "Texto Sucesso" },
      type: "Color",
      defaultValue: "#064e3b",
      section: "settings",
    },
    successIconColor: {
      label: { en: "Success Icon", pt: "Ícone Sucesso" },
      type: "Color",
      defaultValue: "#10b981",
      section: "settings",
    },
    infoBackgroundColor: {
      label: { en: "Info Background", pt: "Fundo Info" },
      type: "Color",
      defaultValue: "#dbeafe",
      section: "settings",
    },
    infoBorderColor: {
      label: { en: "Info Border", pt: "Borda Info" },
      type: "Color",
      defaultValue: "#3b82f6",
      section: "settings",
    },
    infoTextColor: {
      label: { en: "Info Text", pt: "Texto Info" },
      type: "Color",
      defaultValue: "#1e3a8a",
      section: "settings",
    },
    infoIconColor: {
      label: { en: "Info Icon", pt: "Ícone Info" },
      type: "Color",
      defaultValue: "#3b82f6",
      section: "settings",
    },
    warningBackgroundColor: {
      label: { en: "Warning Background", pt: "Fundo Aviso" },
      type: "Color",
      defaultValue: "#fef3c7",
      section: "settings",
    },
    warningBorderColor: {
      label: { en: "Warning Border", pt: "Borda Aviso" },
      type: "Color",
      defaultValue: "#f59e0b",
      section: "settings",
    },
    warningTextColor: {
      label: { en: "Warning Text", pt: "Texto Aviso" },
      type: "Color",
      defaultValue: "#78350f",
      section: "settings",
    },
    warningIconColor: {
      label: { en: "Warning Icon", pt: "Ícone Aviso" },
      type: "Color",
      defaultValue: "#f59e0b",
      section: "settings",
    },
    errorBackgroundColor: {
      label: { en: "Error Background", pt: "Fundo Erro" },
      type: "Color",
      defaultValue: "#fee2e2",
      section: "settings",
    },
    errorBorderColor: {
      label: { en: "Error Border", pt: "Borda Erro" },
      type: "Color",
      defaultValue: "#ef4444",
      section: "settings",
    },
    errorTextColor: {
      label: { en: "Error Text", pt: "Texto Erro" },
      type: "Color",
      defaultValue: "#7f1d1d",
      section: "settings",
    },
    errorIconColor: {
      label: { en: "Error Icon", pt: "Ícone Erro" },
      type: "Color",
      defaultValue: "#ef4444",
      section: "settings",
    },
    mainIconSize: {
      label: { en: "Main Icon Size", pt: "Tamanho Ícone Principal" },
      type: "Number",
      defaultValue: 20,
      section: "settings",
    },
    closeIconSize: {
      label: { en: "Close Icon Size", pt: "Tamanho Ícone Fechar" },
      type: "Number",
      defaultValue: 16,
      section: "settings",
    },
  },
  triggerEvents: [
    {
      name: "toastShown",
      label: { en: "Toast Shown", pt: "Toast Exibido" },
      event: { toast: {} },
    },
    {
      name: "toastDismissed",
      label: { en: "Toast Dismissed", pt: "Toast Removido" },
      event: { toastId: "" },
    },
  ],
};
