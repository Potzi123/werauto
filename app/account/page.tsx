import { getUserName } from "@/utils/getUserName"

export default function Account() {
    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Account</h1>
        <p>This is your account page where you can manage your settings.</p>
        <p>Current user: {getUserName()}</p>
      </div>
    )
  }