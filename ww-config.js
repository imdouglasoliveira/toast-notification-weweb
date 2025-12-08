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
      min: 1000,
      max: 30000,
      step: 500,
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
      min: 1,
      max: 10,
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
      bindable: true,
      section: "settings",
      options: {
        info: {
          en: "Toggle OFF to hide placeholder after configuring workflows",
          pt: "Desative para ocultar o placeholder após configurar workflows",
        },
      },
    },
    // Success Toast Colors
    successBackgroundColor: {
      label: {
        en: "Success Background Color",
        pt: "Cor de Fundo Sucesso",
      },
      type: "Color",
      defaultValue: "#d1fae5",
      section: "settings",
    },
    successBorderColor: {
      label: {
        en: "Success Border Color",
        pt: "Cor da Borda Sucesso",
      },
      type: "Color",
      defaultValue: "#10b981",
      section: "settings",
    },
    successTextColor: {
      label: {
        en: "Success Text Color",
        pt: "Cor do Texto Sucesso",
      },
      type: "Color",
      defaultValue: "#064e3b",
      section: "settings",
    },
    successIconColor: {
      label: {
        en: "Success Icon Color",
        pt: "Cor do Ícone Sucesso",
      },
      type: "Color",
      defaultValue: "#10b981",
      section: "settings",
    },
    // Info Toast Colors
    infoBackgroundColor: {
      label: {
        en: "Info Background Color",
        pt: "Cor de Fundo Info",
      },
      type: "Color",
      defaultValue: "#dbeafe",
      section: "settings",
    },
    infoBorderColor: {
      label: {
        en: "Info Border Color",
        pt: "Cor da Borda Info",
      },
      type: "Color",
      defaultValue: "#3b82f6",
      section: "settings",
    },
    infoTextColor: {
      label: {
        en: "Info Text Color",
        pt: "Cor do Texto Info",
      },
      type: "Color",
      defaultValue: "#1e3a8a",
      section: "settings",
    },
    infoIconColor: {
      label: {
        en: "Info Icon Color",
        pt: "Cor do Ícone Info",
      },
      type: "Color",
      defaultValue: "#3b82f6",
      section: "settings",
    },
    // Warning Toast Colors
    warningBackgroundColor: {
      label: {
        en: "Warning Background Color",
        pt: "Cor de Fundo Aviso",
      },
      type: "Color",
      defaultValue: "#fef3c7",
      section: "settings",
    },
    warningBorderColor: {
      label: {
        en: "Warning Border Color",
        pt: "Cor da Borda Aviso",
      },
      type: "Color",
      defaultValue: "#f59e0b",
      section: "settings",
    },
    warningTextColor: {
      label: {
        en: "Warning Text Color",
        pt: "Cor do Texto Aviso",
      },
      type: "Color",
      defaultValue: "#78350f",
      section: "settings",
    },
    warningIconColor: {
      label: {
        en: "Warning Icon Color",
        pt: "Cor do Ícone Aviso",
      },
      type: "Color",
      defaultValue: "#f59e0b",
      section: "settings",
    },
    // Error Toast Colors
    errorBackgroundColor: {
      label: {
        en: "Error Background Color",
        pt: "Cor de Fundo Erro",
      },
      type: "Color",
      defaultValue: "#fee2e2",
      section: "settings",
    },
    errorBorderColor: {
      label: {
        en: "Error Border Color",
        pt: "Cor da Borda Erro",
      },
      type: "Color",
      defaultValue: "#ef4444",
      section: "settings",
    },
    errorTextColor: {
      label: {
        en: "Error Text Color",
        pt: "Cor do Texto Erro",
      },
      type: "Color",
      defaultValue: "#7f1d1d",
      section: "settings",
    },
    errorIconColor: {
      label: {
        en: "Error Icon Color",
        pt: "Cor do Ícone Erro",
      },
      type: "Color",
      defaultValue: "#ef4444",
      section: "settings",
    },
    // Icon Sizes
    mainIconSize: {
      label: {
        en: "Main Icon Size",
        pt: "Tamanho do Ícone Principal",
      },
      type: "Number",
      defaultValue: 20,
      min: 16,
      max: 48,
      step: 2,
      section: "settings",
    },
    closeIconSize: {
      label: {
        en: "Close Icon Size",
        pt: "Tamanho do Ícone Fechar",
      },
      type: "Number",
      defaultValue: 16,
      min: 12,
      max: 32,
      step: 2,
      section: "settings",
    },
  },
  actions: [
    {
      label: "Show Success Toast",
      action: "showSuccessToast",
      args: [
        {
          name: "title",
          type: "text",
          bindable: true,
          placeholder: "Enter toast title",
        },
        {
          name: "description",
          type: "text",
          bindable: true,
          optional: true,
          placeholder: "Optional description",
        },
        {
          name: "durationMs",
          type: "number",
          bindable: true,
          optional: true,
          placeholder: "5000",
        },
      ],
    },
    {
      label: "Show Info Toast",
      action: "showInfoToast",
      args: [
        {
          name: "title",
          type: "text",
          bindable: true,
          placeholder: "Enter toast title",
        },
        {
          name: "description",
          type: "text",
          bindable: true,
          optional: true,
          placeholder: "Optional description",
        },
        {
          name: "durationMs",
          type: "number",
          bindable: true,
          optional: true,
          placeholder: "5000",
        },
      ],
    },
    {
      label: "Show Warning Toast",
      action: "showWarningToast",
      args: [
        {
          name: "title",
          type: "text",
          bindable: true,
          placeholder: "Enter toast title",
        },
        {
          name: "description",
          type: "text",
          bindable: true,
          optional: true,
          placeholder: "Optional description",
        },
        {
          name: "durationMs",
          type: "number",
          bindable: true,
          optional: true,
          placeholder: "5000",
        },
      ],
    },
    {
      label: "Show Error Toast",
      action: "showErrorToast",
      args: [
        {
          name: "title",
          type: "text",
          bindable: true,
          placeholder: "Enter toast title",
        },
        {
          name: "description",
          type: "text",
          bindable: true,
          optional: true,
          placeholder: "Optional description",
        },
        {
          name: "durationMs",
          type: "number",
          bindable: true,
          optional: true,
          placeholder: "5000",
        },
      ],
    },
    {
      label: "Show Toast (Advanced)",
      action: "showToast",
      args: [
        {
          name: "data",
          type: "object",
          bindable: true,
          placeholder: '{"type":"success","title":"Title","news":false}',
        },
      ],
    },
  ],
  events: [
    {
      name: "toastShown",
      label: {
        en: "Toast Shown",
        pt: "Toast Exibido",
      },
      event: {
        toast: {},
      },
    },
    {
      name: "toastDismissed",
      label: {
        en: "Toast Dismissed",
        pt: "Toast Removido",
      },
      event: {
        toastId: "",
      },
    },
    {
      name: "toastInvalidPayload",
      label: {
        en: "Toast Invalid Payload",
        pt: "Payload Inválido do Toast",
      },
      event: {
        error: "",
        payload: {},
      },
    },
  ],
};
