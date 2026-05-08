// components/StatusModal.jsx
import React, { useEffect } from "react";
import "./StatusModal.css";

/**
 * Props:
 * - isOpen: boolean
 * - status: "success" | "error" | "loading" | "warning" | "info"
 * - title: string
 * - message: string
 * - onClose: function
 * - onConfirm: function
 * - confirmText: string
 * - cancelText: string
 * - showCancelButton: boolean
 * - autoClose: boolean
 * - autoCloseTime: number
 */

const STATUS_CONFIG = {
  success: {
    icon: "✔",
    color: "#2563eb",
  },
  error: {
    icon: "✖",
    color: "#dc2626",
  },
  loading: {
    icon: "⏳",
    color: "#2563eb",
  },
  warning: {
    icon: "⚠",
    color: "#d97706",
  },
  info: {
    icon: "ℹ",
    color: "#2563eb",
  },
};

const StatusModal = ({
  isOpen,
  status = "info",
  title = "Estado",
  message = "",
  onClose,
  onConfirm,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  showCancelButton = true,
  autoClose = false,
  autoCloseTime = 3000,
}) => {
  const currentStatus = STATUS_CONFIG[status] || STATUS_CONFIG.info;

  useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose?.();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="status-modal-overlay">
      <div className="status-modal-container">
        <button className="status-modal-close" onClick={onClose}>
          ×
        </button>

        <div
          className="status-modal-icon"
          style={{ borderColor: currentStatus.color }}
        >
          <span style={{ color: currentStatus.color }}>
            {currentStatus.icon}
          </span>
        </div>

        <h2 className="status-modal-title">{title}</h2>

        <p className="status-modal-message">{message}</p>

        {status === "loading" ? (
          <div className="status-modal-loading">
            Procesando información...
          </div>
        ) : (
          <div className="status-modal-actions">
            {showCancelButton && (
              <button
                className="status-modal-button cancel"
                onClick={onClose}
              >
                {cancelText}
              </button>
            )}

            <button
              className="status-modal-button confirm"
              onClick={onConfirm || onClose}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusModal;