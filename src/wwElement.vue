<template>
  <div :class="['toast-notification-host', `position-${content.position}`]">
    <!-- Editor Placeholder - Only visible when explicitly enabled -->
    <div v-if="showPlaceholder" class="toast-editor-placeholder">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
      <span>Toast Notification Host</span>
      <small>Configure actions in workflows to show toasts</small>
    </div>

    <transition-group name="toast-list" tag="div" class="toast-container">
      <div
        v-for="toast in activeToasts"
        :key="toast.id"
        :class="['toast-item', `toast-${toast.type}`]"
        :style="getToastStyle(toast.type)"
      >
        <div class="toast-content">
          <div class="toast-left">
            <div class="toast-icon" :style="{ color: getIconColor(toast.type) }">
              <!-- Success Icon -->
              <svg v-if="toast.type === 'success'" xmlns="http://www.w3.org/2000/svg" :width="content.mainIconSize || 20" :height="content.mainIconSize || 20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              <!-- Info Icon -->
              <svg v-else-if="toast.type === 'info'" xmlns="http://www.w3.org/2000/svg" :width="content.mainIconSize || 20" :height="content.mainIconSize || 20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4"/>
                <path d="M12 8h.01"/>
              </svg>
              <!-- Warning Icon -->
              <svg v-else-if="toast.type === 'warning'" xmlns="http://www.w3.org/2000/svg" :width="content.mainIconSize || 20" :height="content.mainIconSize || 20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                <path d="M12 9v4"/>
                <path d="M12 17h.01"/>
              </svg>
              <!-- Error Icon -->
              <svg v-else-if="toast.type === 'error'" xmlns="http://www.w3.org/2000/svg" :width="content.mainIconSize || 20" :height="content.mainIconSize || 20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="m15 9-6 6"/>
                <path d="m9 9 6 6"/>
              </svg>
            </div>
            <div class="toast-body">
              <div class="toast-header">
                <span v-if="toast.news" class="toast-type-label" :style="{ color: getIconColor(toast.type) }">{{ newsLabel }}</span>
                <h4 class="toast-title">{{ toast.title }}</h4>
              </div>
              <p v-if="toast.description" class="toast-description">
                {{ toast.description }}
              </p>
              <span v-if="content.showTimestamp" class="toast-timestamp">{{ getTimestamp() }}</span>
            </div>
          </div>
          <button class="toast-close" @click="dismissToast(toast.id)" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" :width="content.closeIconSize || 16" :height="content.closeIconSize || 16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 6 6 18"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'ToastNotificationHost',
  props: {
    content: { type: Object, required: true },
  },
  data() {
    return {
      activeToasts: [],
      toastCounter: 0,
    };
  },
  computed: {
    showPlaceholder() {
      return this.content.showEditorPlaceholder === true && this.activeToasts.length === 0;
    },
    defaultDuration() {
      return this.content.defaultDuration || 5000;
    },
    maxToasts() {
      return this.content.maxToasts || 5;
    },
    newsLabel() {
      return (this.content.language || 'en') === 'pt' ? 'NOVIDADE' : 'NEWS';
    },
  },
  methods: {
    getTimestamp() {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const todayLabel = (this.content.language || 'en') === 'pt' ? 'Hoje' : 'Today';
      return `${todayLabel} ${hours}:${minutes}`;
    },

    getToastColors(type) {
      const colorMap = {
        success: {
          backgroundColor: this.content.successBackgroundColor || '#d1fae5',
          borderColor: this.content.successBorderColor || '#10b981',
          textColor: this.content.successTextColor || '#064e3b',
          iconColor: this.content.successIconColor || '#10b981',
        },
        info: {
          backgroundColor: this.content.infoBackgroundColor || '#dbeafe',
          borderColor: this.content.infoBorderColor || '#3b82f6',
          textColor: this.content.infoTextColor || '#1e3a8a',
          iconColor: this.content.infoIconColor || '#3b82f6',
        },
        warning: {
          backgroundColor: this.content.warningBackgroundColor || '#fef3c7',
          borderColor: this.content.warningBorderColor || '#f59e0b',
          textColor: this.content.warningTextColor || '#78350f',
          iconColor: this.content.warningIconColor || '#f59e0b',
        },
        error: {
          backgroundColor: this.content.errorBackgroundColor || '#fee2e2',
          borderColor: this.content.errorBorderColor || '#ef4444',
          textColor: this.content.errorTextColor || '#7f1d1d',
          iconColor: this.content.errorIconColor || '#ef4444',
        },
      };
      return colorMap[type] || colorMap.info;
    },

    getToastStyle(type) {
      const colors = this.getToastColors(type);
      return {
        '--toast-bg-color': colors.backgroundColor,
        '--toast-border-color': colors.borderColor,
        '--toast-text-color': colors.textColor,
        '--toast-icon-color': colors.iconColor,
      };
    },

    getIconColor(type) {
      return this.getToastColors(type).iconColor;
    },

    showSuccessToast(title, description, durationMs) {
      this.showToast({
        type: 'success',
        title: title || '',
        description: description || '',
        durationMs: durationMs || this.defaultDuration,
      });
    },

    showInfoToast(title, description, durationMs) {
      this.showToast({
        type: 'info',
        title: title || '',
        description: description || '',
        durationMs: durationMs || this.defaultDuration,
      });
    },

    showWarningToast(title, description, durationMs) {
      this.showToast({
        type: 'warning',
        title: title || '',
        description: description || '',
        durationMs: durationMs || this.defaultDuration,
      });
    },

    showErrorToast(title, description, durationMs) {
      this.showToast({
        type: 'error',
        title: title || '',
        description: description || '',
        durationMs: durationMs || this.defaultDuration,
      });
    },

    showToast(data) {
      if (!data || typeof data !== 'object') {
        data = {};
      }

      const validationError = this.validatePayload(data);
      if (validationError) {
        this.$emit('trigger-event', {
          name: 'toastInvalidPayload',
          event: {
            error: validationError,
            payload: data,
          },
        });
        console.error('[Toast] Invalid payload:', validationError, data);
        return;
      }

      const toastId = `toast-${Date.now()}-${++this.toastCounter}`;

      const toast = {
        id: toastId,
        type: data.type,
        title: data.title,
        description: data.description || null,
        durationMs: data.durationMs || this.defaultDuration,
        news: data.news !== undefined ? data.news : false,
        createdAt: new Date(),
      };

      if (this.activeToasts.length >= this.maxToasts) {
        this.dismissToast(this.activeToasts[0].id);
      }

      this.activeToasts.push(toast);

      this.$emit('trigger-event', {
        name: 'toastShown',
        event: { toast },
      });

      setTimeout(() => {
        this.dismissToast(toastId);
      }, toast.durationMs);
    },

    dismissToast(toastId) {
      const index = this.activeToasts.findIndex(t => t.id === toastId);
      if (index === -1) return;

      setTimeout(() => {
        const currentIndex = this.activeToasts.findIndex(t => t.id === toastId);
        if (currentIndex !== -1) {
          this.activeToasts.splice(currentIndex, 1);
          this.$emit('trigger-event', {
            name: 'toastDismissed',
            event: { toastId },
          });
        }
      }, 300);
    },

    validatePayload(data) {
      if (!data || typeof data !== 'object') {
        return 'Payload must be an object';
      }

      if (!data.type) {
        return 'Missing required field: type';
      }

      const validTypes = ['success', 'info', 'warning', 'error'];
      if (!validTypes.includes(data.type)) {
        return `Invalid type: ${data.type}. Must be one of: ${validTypes.join(', ')}`;
      }

      if (!data.title || typeof data.title !== 'string') {
        return 'Missing or invalid required field: title (must be a string)';
      }

      if (data.description !== undefined && typeof data.description !== 'string') {
        return 'Invalid field: description (must be a string if provided)';
      }

      if (data.durationMs !== undefined) {
        if (typeof data.durationMs !== 'number' || data.durationMs < 0) {
          return 'Invalid field: durationMs (must be a positive number if provided)';
        }
      }

      if (data.news !== undefined && typeof data.news !== 'boolean') {
        return 'Invalid field: news (must be a boolean if provided)';
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.toast-notification-host {
  position: fixed;
  z-index: 9999;
  pointer-events: none;

  &.position-top-right {
    top: 24px;
    right: 24px;
  }

  &.position-top-left {
    top: 24px;
    left: 24px;
  }

  &.position-bottom-right {
    bottom: 24px;
    right: 24px;
  }

  &.position-bottom-left {
    bottom: 24px;
    left: 24px;
  }

  @media (max-width: 768px) {
    top: 16px !important;
    left: 50% !important;
    right: auto !important;
    bottom: auto !important;
    transform: translateX(-50%);
    width: 90%;
    max-width: 90%;
  }
}

.toast-editor-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 24px;
  background: #f3f4f6;
  border: 2px dashed #9ca3af;
  border-radius: 8px;
  color: #6b7280;
  pointer-events: auto;
  min-width: 200px;

  svg {
    color: #9ca3af;
  }

  span {
    font-size: 14px;
    font-weight: 600;
    color: #374151;
  }

  small {
    font-size: 12px;
    color: #9ca3af;
    text-align: center;
  }
}

.toast-container {
  display: flex;
  flex-direction: column;
  pointer-events: auto;

  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
  }
}

.toast-item {
  background: var(--toast-bg-color);
  border: 2px solid var(--toast-border-color);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-width: 380px;
  max-width: 480px;
  position: relative;
  transition: all 0.3s ease;
  color: var(--toast-text-color);

  @media (max-width: 768px) {
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    padding: 16px;
    margin-bottom: 10px;
  }
}

.toast-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.toast-left {
  display: flex;
  gap: 12px;
  flex: 1;

  @media (max-width: 768px) {
    gap: 10px;
  }
}

.toast-close {
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: 2px solid currentColor;
    outline-offset: 2px;
    border-radius: 4px;
  }
}

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  padding-top: 2px;
}

.toast-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (max-width: 768px) {
    gap: 6px;
  }
}

.toast-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toast-type-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 10px;
  }
}

.toast-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: inherit;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.3;
  }
}

.toast-description {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  opacity: 0.85;

  @media (max-width: 768px) {
    font-size: 13px;
    line-height: 1.4;
  }
}

.toast-timestamp {
  font-size: 12px;
  opacity: 0.6;
  margin-top: 4px;

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: 2px;
  }
}

// Transition animations
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(100%);

  @media (max-width: 768px) {
    transform: translateY(-20px);
  }
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100%);

  @media (max-width: 768px) {
    transform: translateY(-20px);
  }
}

.toast-list-move {
  transition: transform 0.3s ease;
}
</style>
