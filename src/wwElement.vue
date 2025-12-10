<template>
  <div class="toast-host">
    <div class="placeholder">
      <span>🔔 Toast Notification</span>
      <small>Componente de notificações</small>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToastNotification',
  props: {
    content: { type: Object, required: true },
  },
};
</script>

<style scoped>
.toast-host {
  display: inline-block;
  min-width: 200px;
  min-height: 60px;
}

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

.placeholder span {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.placeholder small {
  font-size: 12px;
  color: #9ca3af;
}
</style>
