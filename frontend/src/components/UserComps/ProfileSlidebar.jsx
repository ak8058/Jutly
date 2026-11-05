import { AiOutlineMessage } from "react-icons/ai";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineLogout,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useState } from "react";
import { setUser } from "../../redux-toolkit/reducers/userReducer";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfileSidebar({ active, setActive }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const avatarUrl = user?.avatar?.url;

  async function logoutHandler() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v2/user/logout-user`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        toast.success(res.data.message);
        navigate("/", { replace: true });
      }
    } catch (err) {
      toast.error("Try again Later!");
      console.error(err);
    }
  }

  const items = [
    { id: 1, label: "Profile", Icon: RxPerson, onClick: () => setActive(1) },
    {
      id: 2,
      label: "Orders",
      Icon: HiOutlineShoppingBag,
      onClick: () => setActive(2),
    },
    {
      id: 3,
      label: "Refunds",
      Icon: HiOutlineReceiptRefund,
      onClick: () => setActive(3),
    },
    {
      id: 4,
      label: "Inbox",
      Icon: AiOutlineMessage,
      onClick: () => setActive(4) || navigate("/inbox"),
    },
    {
      id: 5,
      label: "Track Order",
      Icon: MdOutlineTrackChanges,
      onClick: () => setActive(5),
    },
    {
      id: 6,
      label: "Change Password",
      Icon: RiLockPasswordLine,
      onClick: () => setActive(6),
    },
    {
      id: 7,
      label: "Address",
      Icon: TbAddressBook,
      onClick: () => setActive(7),
    },
    ...(user && user.role === "Admin"
      ? [
          {
            id: 9,
            label: "Admin Dashboard",
            Icon: MdOutlineAdminPanelSettings,
            onClick: () => setActive(9) || navigate("/admin-dashboard"),
          },
        ]
      : []),
  ];

  return (
    <nav className="w-full rounded-2xl border border-ink-100 bg-white p-3 shadow-card">
      {/* identity */}
      <div className="mb-3 flex items-center justify-center gap-3 rounded-xl p-3 min-[800px]:justify-start">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white">
          <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full font-display text-lg font-bold text-brand-700">
            {avatarUrl && !avatarFailed ? (
              <img
                key={avatarUrl}
                src={avatarUrl}
                alt={`${user?.fullName || "Profile"} profile`}
                onError={() => setAvatarFailed(true)}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <span
                aria-label="Profile photo unavailable"
                className="grid h-full w-full place-items-center rounded-full bg-[#6366F1]/10"
              >
                {user?.fullName?.trim()?.charAt(0)?.toUpperCase() || "J"}
              </span>
            )}
          </div>
        </div>

        <div className="hidden min-w-0 display-block-800px">
          <p className="truncate font-display text-[14px] font-bold text-ink-900">
            {user?.fullName}
          </p>
          <p className="truncate text-[12px] text-ink-400">{user?.email}</p>
        </div>
      </div>

      <ul className="space-y-1">
        {items.map(({ id, label, Icon, onClick }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.98 }}
                className={`relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl px-0 py-2.5 text-center transition-colors duration-200 min-[800px]:justify-start min-[800px]:px-3 min-[800px]:text-left ${
                  isActive
                    ? "bg-[#6366F1]/10 font-semibold text-[#6366F1]"
                    : "text-ink-600 hover:bg-ink-50 hover:text-ink-900"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="profile-nav-active"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="pointer-events-none absolute inset-0 rounded-xl bg-[#6366F1]/10"
                  />
                )}
                <Icon
                  size={19}
                  className="pointer-events-none relative z-10 shrink-0"
                />
                <span className="relative z-10 hidden text-[14px] font-medium display-block-800px">
                  {label}
                </span>
              </motion.button>
            </li>
          );
        })}

        {/* logout */}
        <li className="pt-1">
          <motion.button
            onClick={() => setActive(8) || logoutHandler()}
            whileTap={{ scale: 0.98 }}
            className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border-t border-ink-100 px-0 py-2.5 pt-3.5 text-danger-600 transition-colors duration-200 hover:bg-danger-50 min-[800px]:justify-start min-[800px]:px-3"
          >
            <MdOutlineLogout size={19} className="shrink-0" />
            <span className="hidden text-[14px] font-medium display-block-800px">
              Log out
            </span>
          </motion.button>
        </li>
      </ul>
    </nav>
  );
}

export default ProfileSidebar;
