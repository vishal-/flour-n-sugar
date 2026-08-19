import { prisma } from "@/lib/prisma";
import { NotoIcon } from "@/components/ui/NotoIcon";
import { MatIcon } from "@/components/ui/MatIcon";
import sparkles from "@iconify-icons/noto/sparkles";
import groupOutlineRounded from "@iconify-icons/material-symbols/group-outline-rounded";
import personOutlineRounded from "@iconify-icons/material-symbols/person-outline-rounded";
import searchRounded from "@iconify-icons/material-symbols/search-rounded";
import checkCircleOutlineRounded from "@iconify-icons/material-symbols/check-circle-outline-rounded";
import adminPanelSettingsOutlineRounded from "@iconify-icons/material-symbols/admin-panel-settings-outline-rounded";
import storefrontOutlineRounded from "@iconify-icons/material-symbols/storefront-outline-rounded";

export default async function AdminUsersPage() {
  const [users, totalUsers, verifiedCount, adminCount, storeOwnersCount] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        storeMemberships: {
          include: {
            store: {
              select: { name: true, slug: true },
            },
          },
        },
      },
      take: 50,
    }),
    prisma.user.count(),
    prisma.user.count({ where: { emailVerified: true } }),
    prisma.user.count({ where: { platformRole: "ADMIN" } }),
    prisma.storeMember.count({ where: { role: "OWNER" } }),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
            <MatIcon icon={groupOutlineRounded} size={16} />
            <span>User Accounts</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-dark-brown dark:text-rose-50 mt-1">
            Manage User Directory
          </h2>
          <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 mt-0.5">
            Manage platform accounts, authentication roles, and baker permissions.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Total Users</span>
            <MatIcon icon={groupOutlineRounded} size={18} className="text-primary" />
          </div>
          <p className="font-serif text-2xl font-bold text-dark-brown dark:text-rose-50">
            {totalUsers}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Registered accounts
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Store Owners</span>
            <MatIcon icon={storefrontOutlineRounded} size={18} className="text-amber-500" />
          </div>
          <p className="font-serif text-2xl font-bold text-amber-600 dark:text-amber-400">
            {storeOwnersCount}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Registered bakers
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Verified</span>
            <MatIcon icon={checkCircleOutlineRounded} size={18} className="text-emerald-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {verifiedCount}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Verified email addresses
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#2b1b17] border border-rose-100/70 dark:border-rose-950/50 space-y-1 shadow-xs">
          <div className="flex items-center justify-between text-dark-brown/50 dark:text-rose-200/50">
            <span className="text-[11px] font-bold uppercase tracking-wide">Admins</span>
            <MatIcon icon={adminPanelSettingsOutlineRounded} size={18} className="text-purple-600" />
          </div>
          <p className="font-serif text-2xl font-bold text-purple-600 dark:text-purple-400">
            {adminCount}
          </p>
          <span className="text-[10px] text-dark-brown/60 dark:text-rose-200/60 block">
            Platform administrators
          </span>
        </div>
      </div>

      {/* Users List Container */}
      <div className="bg-white dark:bg-[#2b1b17] rounded-3xl border border-rose-100/80 dark:border-rose-950/50 shadow-xs overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 sm:p-6 border-b border-rose-100/60 dark:border-rose-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl bg-rose-50/30 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950/60 text-xs font-semibold text-dark-brown dark:text-rose-100 outline-none focus:border-primary transition"
            />
            <MatIcon
              icon={searchRounded}
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-brown/40 dark:text-rose-200/40"
            />
          </div>

          <span className="text-xs font-bold text-dark-brown/60 dark:text-rose-200/60">
            Showing {users.length} of {totalUsers} users
          </span>
        </div>

        {/* Users Table */}
        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-rose-50/50 dark:bg-rose-950/30 text-[10px] font-extrabold uppercase tracking-wider text-dark-brown/60 dark:text-rose-200/60 border-b border-rose-100/60 dark:border-rose-950/40">
                <tr>
                  <th className="py-3.5 px-6">User Profile</th>
                  <th className="py-3.5 px-4">Role</th>
                  <th className="py-3.5 px-4">Store Affiliations</th>
                  <th className="py-3.5 px-4">Verification</th>
                  <th className="py-3.5 px-6 text-right">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100/40 dark:divide-rose-950/30 font-medium">
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20 transition"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {u.image ? (
                          <img
                            src={u.image}
                            alt={u.name}
                            className="w-9 h-9 rounded-full object-cover border border-rose-100"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-rose-100 dark:bg-rose-950/70 text-primary flex items-center justify-center">
                            <MatIcon icon={personOutlineRounded} size={18} />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-dark-brown dark:text-rose-100 block">
                            {u.name}
                          </span>
                          <span className="text-[11px] text-dark-brown/50 dark:text-rose-200/50">
                            {u.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase ${
                          u.platformRole === "ADMIN"
                            ? "bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200"
                            : u.platformRole === "MODERATOR"
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200"
                            : "bg-stone-100 text-stone-700 dark:bg-stone-900/60 dark:text-stone-300"
                        }`}
                      >
                        {u.platformRole}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      {u.storeMemberships.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {u.storeMemberships.map((m) => (
                            <span
                              key={m.id}
                              className="text-[10px] bg-rose-50 dark:bg-rose-950/40 text-primary font-bold px-2 py-0.5 rounded-md border border-rose-100/60"
                            >
                              {m.store.name} ({m.role})
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-dark-brown/40 dark:text-rose-200/40 text-[11px]">
                          Customer / No store
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      {u.emailVerified ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <MatIcon icon={checkCircleOutlineRounded} size={14} />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="text-dark-brown/40 dark:text-rose-200/40 text-[11px]">
                          Unverified
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-6 text-right text-dark-brown/50 dark:text-rose-200/50 text-[11px]">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center space-y-2">
            <NotoIcon icon={sparkles} size={36} />
            <p className="text-xs text-dark-brown/60 dark:text-rose-200/60 font-medium">
              No users registered yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}