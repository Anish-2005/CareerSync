import { motion } from "framer-motion"
import { Shield, Bell, Check } from "lucide-react"
import { useThemeClasses } from "@/hooks/useThemeClasses"

const m = motion as any

export default function SettingsTab() {
  const theme = useThemeClasses()

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Account Settings */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 sm:p-8 rounded-3xl"
        style={{ background: theme.bgCardStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
          <Shield className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
          <span>Account Settings</span>
        </h3>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
            <div>
              <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Email Notifications</p>
              <p style={{ color: theme.textTertiary }}>Receive updates about your applications</p>
            </div>
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,255,136,0.12)", border: `1px solid rgba(0,255,136,0.28)`, color: "#00ff88" }}><Check /></m.button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
            <div>
              <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Profile Visibility</p>
              <p style={{ color: theme.textTertiary }}>Make your profile visible to recruiters</p>
            </div>
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,255,136,0.12)", border: `1px solid rgba(0,255,136,0.28)`, color: "#00ff88" }}><Check /></m.button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
            <div>
              <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Data Export</p>
              <p style={{ color: theme.textTertiary }}>Download all your application data</p>
            </div>
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}>Export</m.button>
          </div>
        </div>
      </m.div>

      {/* Privacy Settings */}
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-4 sm:p-8 rounded-3xl"
        style={{ background: theme.bgCardStyle?.backgroundColor, border: `1px solid ${theme.borderMedium}` }}
      >
        <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: theme.textPrimary, display: "flex", alignItems: "center", gap: 10 }}>
          <Bell className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: "#00ff88" }} />
          <span>Privacy & Security</span>
        </h3>

        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
            <div>
              <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Two-Factor Authentication</p>
              <p style={{ color: theme.textTertiary }}>Add an extra layer of security</p>
            </div>
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(255,107,0,0.12)", border: `1px solid rgba(255,107,0,0.28)`, color: "#ff6b00" }}>Enable</m.button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
            <div>
              <p style={{ color: theme.textPrimary, fontWeight: 700 }}>Change Password</p>
              <p style={{ color: theme.textTertiary }}>Update your account password</p>
            </div>
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(0,212,255,0.12)", border: `1px solid ${theme.borderMedium}`, color: theme.textAccent }}>Change</m.button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-xl gap-3" style={{ background: theme.bgInputStyle?.backgroundColor || "#0f2540", border: `1px solid ${theme.borderMedium}` }}>
            <div>
              <p style={{ color: "#ff8a8a", fontWeight: 700 }}>Delete Account</p>
              <p style={{ color: theme.textTertiary }}>Permanently delete your account and data</p>
            </div>
            <m.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-3 py-2 rounded-lg" style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}>Delete</m.button>
          </div>
        </div>
      </m.div>
    </div>
  )
}