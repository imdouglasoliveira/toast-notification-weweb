<template>
  <div class="toast-host">
    <!-- Editor Placeholder -->
    <div v-if="showPlaceholder" class="placeholder">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
      <span>🔔 Toast Notification</span>
      <small>Configure workflows to trigger toasts</small>
    </div>

    <!-- Toast Container (fixed position for runtime) -->
    <div :class="['toast-container', `position-${content.position || 'top-right'}`]">
      <transition-group name="toast-list" tag="div" class="toast-list">
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
                <p v-if="toast.description" class="toast-description">{{ toast.description }}</p>
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
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
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
      return this.content.showEditorPlaceholder !== false;
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

      if (!data.type || !data.title) {
        console.error('[Toast] Missing required fields: type and title');
        return;
      }

      const toastId = `toast-${Date.now()}-${++this.toastCounter}`;

      const toast = {
        id: toastId,
        type: data.type,
        title: data.title,
        description: data.description || null,
        durationMs: data.durationMs || this.defaultDuration,
        news: data.news || false,
        createdAt: new Date(),
      };

      if (this.activeToasts.length >= this.maxToasts) {
        this.activeToasts.shift();
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
      if (index !== -1) {
        this.activeToasts.splice(index, 1);
        this.$emit('trigger-event', {
          name: 'toastDismissed',
          event: { toastId },
        });
      }
    },
  },
};
</script>

<style scoped>
/* Host - visible in editor */
.toast-host {
  display: inline-block;
  min-width: 200px;
  min-height: 60px;
}

/* Placeholder */
.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 24px;
  background: #f3f4f6;
  border: 2px dashed #9ca3af;
  border-radius: 8px;
  color: #6b7280;
}

.placeholder svg {
  color: #9ca3af;
}

.placeholder span {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.placeholder small {
  font-size: 12px;
  color: #9ca3af;
}

/* Toast Container - fixed positioning */
.toast-container {
  position: fixed;
  z-index: 9999;
  pointer-events: none;
}

.toast-container.position-top-right {
  top: 16px;
  right: 16px;
}

.toast-container.position-top-left {
  top: 16px;
  left: 16px;
}

.toast-container.position-bottom-right {
  bottom: 16px;
  right: 16px;
}

.toast-container.position-bottom-left {
  bottom: 16px;
  left: 16px;
}

.toast-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Toast Item */
.toast-item {
  background: var(--toast-bg-color);
  border: 2px solid var(--toast-border-color);
  border-radius: 12px;
  padding: 16px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 320px;
  max-width: 420px;
  color: var(--toast-text-color);
  pointer-events: auto;
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
  gap: 4px;
}

.toast-header {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.toast-type-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.toast-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
  color: inherit;
}

.toast-description {
  margin: 0;
  font-size: 13px;
  line-height: 1.4;
  opacity: 0.85;
}

.toast-timestamp {
  font-size: 11px;
  opacity: 0.6;
  margin-top: 4px;
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
  opacity: 0.5;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.toast-close:hover {
  opacity: 1;
}

/* Animations */
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-list-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

/* Mobile */
@media (max-width: 768px) {
  .toast-container {
    top: 8px !important;
    left: 8px !important;
    right: 8px !important;
    bottom: auto !important;
    transform: none;
    width: calc(100% - 16px);
  }

  .toast-item {
    min-width: 100%;
    max-width: 100%;
  }

  .toast-list-enter-from,
  .toast-list-leave-to {
    transform: translateY(-20px);
  }
}
</style>
