
import React, { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Users,
  UserCheck,
  Clock,
  ShieldCheck,
  Mail,
  Phone,
  X,
  ChevronDown,
  Pencil,
  UserMinus,
  UserCheck2,
  RefreshCw,
  Ban,
  MoreHorizontal,
  AlertTriangle,
} from 'lucide-react';

type TeamRole = 'OWNER' | 'ADMIN' | 'STAFF';
type MemberStatus = 'ACTIVE' | 'INVITED' | 'SUSPENDED';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TeamRole;
  status: MemberStatus;
  joinedAt: string;
}

const initialMembers: TeamMember[] = [
  {
    id: 'TM-001',
    name: 'Sanjay Singh',
    email: 'sanjay@example.com',
    phone: '+91 98765 43210',
    role: 'OWNER',
    status: 'ACTIVE',
    joinedAt: 'Jan 15, 2025',
  },
  {
    id: 'TM-002',
    name: 'Aarav Sharma',
    email: 'aarav@example.com',
    phone: '+91 98765 12345',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedAt: 'Feb 10, 2025',
  },
  {
    id: 'TM-003',
    name: 'Priya Mehta',
    email: 'priya@example.com',
    phone: '+91 98111 22334',
    role: 'STAFF',
    status: 'ACTIVE',
    joinedAt: 'Mar 02, 2025',
  },
  {
    id: 'TM-004',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    phone: '+91 98989 12345',
    role: 'STAFF',
    status: 'ACTIVE',
    joinedAt: 'Apr 18, 2025',
  },
  {
    id: 'TM-005',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    phone: '+1 415 555 0198',
    role: 'STAFF',
    status: 'INVITED',
    joinedAt: 'Invitation sent Nov 10, 2026',
  },
  {
    id: 'TM-006',
    name: 'Karan Malhotra',
    email: 'karan@example.com',
    phone: '+91 98100 11223',
    role: 'ADMIN',
    status: 'SUSPENDED',
    joinedAt: 'May 20, 2025',
  },
];

const roleStyles: Record<TeamRole, string> = {
  OWNER: 'bg-purple-50 text-purple-700',
  ADMIN: 'bg-blue-50 text-blue-700',
  STAFF: 'bg-gray-100 text-gray-700',
};

const statusStyles: Record<MemberStatus, string> = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  INVITED: 'bg-amber-50 text-amber-700',
  SUSPENDED: 'bg-red-50 text-red-700',
};

type ConfirmAction = {
  type: 'SUSPEND' | 'ACTIVATE' | 'CANCEL_INVITE' | 'REMOVE' | 'RESEND';
  member: TeamMember;
} | null;

const Team: React.FC = () => {
  const [members, setMembers] = useState(initialMembers);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formRole, setFormRole] = useState<TeamRole>('STAFF');

  const [successMessage, setSuccessMessage] = useState('');

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const query = search.toLowerCase();

      const matchesSearch =
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query);

      const matchesRole =
        roleFilter === 'ALL' || member.role === roleFilter;

      const matchesStatus =
        statusFilter === 'ALL' || member.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [members, search, roleFilter, statusFilter]);

  const activeCount = members.filter(
    (member) => member.status === 'ACTIVE'
  ).length;

  const invitedCount = members.filter(
    (member) => member.status === 'INVITED'
  ).length;

  const adminCount = members.filter(
    (member) => member.role === 'ADMIN'
  ).length;

  const closeModal = () => {
    setShowInviteModal(false);
    setEditingMember(null);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormRole('STAFF');
  };

  const openInviteModal = () => {
    closeModal();
    setShowInviteModal(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormEmail(member.email);
    setFormPhone(member.phone === '—' ? '' : member.phone);
    setFormRole(member.role);
    setActiveMenu(null);
  };

  const handleSaveMember = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingMember) {
      setMembers((current) =>
        current.map((member) =>
          member.id === editingMember.id
            ? {
                ...member,
                name: formName.trim(),
                email: formEmail.trim(),
                phone: formPhone.trim() || '—',
                role:
                  editingMember.role === 'OWNER'
                    ? 'OWNER'
                    : formRole,
              }
            : member
        )
      );

      setSuccessMessage('Team member updated successfully.');
    } else {
      const newMember: TeamMember = {
        id: `TM-${Date.now()}`,
        name: formName.trim(),
        email: formEmail.trim(),
        phone: formPhone.trim() || '—',
        role: formRole,
        status: 'INVITED',
        joinedAt: `Invitation sent ${new Date().toLocaleDateString('en-IN')}`,
      };

      setMembers((current) => [...current, newMember]);
      setSuccessMessage('Mock invitation created successfully.');
    }

    closeModal();
  };

  const executeAction = () => {
    if (!confirmAction) return;

    const { type, member } = confirmAction;

    if (type === 'SUSPEND') {
      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? { ...item, status: 'SUSPENDED' }
            : item
        )
      );
      setSuccessMessage(`${member.name} has been deactivated.`);
    }

    if (type === 'ACTIVATE') {
      setMembers((current) =>
        current.map((item) =>
          item.id === member.id
            ? { ...item, status: 'ACTIVE' }
            : item
        )
      );
      setSuccessMessage(`${member.name} has been activated.`);
    }

    if (type === 'CANCEL_INVITE') {
      setMembers((current) =>
        current.filter((item) => item.id !== member.id)
      );
      setSuccessMessage(`Invitation for ${member.name} cancelled.`);
    }

    if (type === 'REMOVE') {
      setMembers((current) =>
        current.filter((item) => item.id !== member.id)
      );
      setSuccessMessage(`${member.name} has been removed from the team.`);
    }

    if (type === 'RESEND') {
      setSuccessMessage(`Mock invitation resent to ${member.email}.`);
    }

    setConfirmAction(null);
  };

  const getActionDetails = () => {
    if (!confirmAction) return null;

    const details = {
      SUSPEND: {
        title: 'Deactivate team member?',
        description: `This will suspend ${confirmAction.member.name}'s access to this vendor account.`,
        button: 'Deactivate member',
      },
      ACTIVATE: {
        title: 'Activate team member?',
        description: `This will restore ${confirmAction.member.name}'s access.`,
        button: 'Activate member',
      },
      CANCEL_INVITE: {
        title: 'Cancel invitation?',
        description: `The pending invitation for ${confirmAction.member.name} will be removed.`,
        button: 'Cancel invitation',
      },
      REMOVE: {
        title: 'Remove team member?',
        description: `${confirmAction.member.name} will be removed from this vendor team. This action cannot be undone here.`,
        button: 'Remove member',
      },
      RESEND: {
        title: 'Resend invitation?',
        description: `A mock resend action will be recorded for ${confirmAction.member.email}.`,
        button: 'Resend invitation',
      },
    };

    return details[confirmAction.type];
  };

  const confirmation = getActionDetails();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Team Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your team members, roles and account access.
          </p>
        </div>

        <button
          onClick={openInviteModal}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          <Plus size={16} />
          Invite team member
        </button>
      </div>

      {/* Feedback */}
      {successMessage && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage('')}
            aria-label="Dismiss message"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Total Members', value: members.length, icon: Users },
          { label: 'Active Members', value: activeCount, icon: UserCheck },
          { label: 'Pending Invitations', value: invitedCount, icon: Clock },
          { label: 'Administrators', value: adminCount, icon: ShieldCheck },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="bg-white border border-gray-100 rounded-xl p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center">
                  <Icon size={18} className="text-gray-500" />
                </div>
              </div>
              <p className="text-2xl font-semibold text-gray-900 mt-3">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Team table */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-visible">
        <div className="p-5 border-b border-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Team members
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {filteredMembers.length} members displayed
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search name or email"
                  className="w-full sm:w-56 pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-400"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white outline-none"
              >
                <option value="ALL">All roles</option>
                <option value="OWNER">Owner</option>
                <option value="ADMIN">Admin</option>
                <option value="STAFF">Staff</option>
              </select>

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white outline-none"
              >
                <option value="ALL">All statuses</option>
                <option value="ACTIVE">Active</option>
                <option value="INVITED">Invited</option>
                <option value="SUSPENDED">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="bg-gray-50/70">
              <tr>
                {[
                  'Team member',
                  'Contact',
                  'Role',
                  'Status',
                  'Joined / Invited',
                  'Actions',
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-3 text-xs font-medium text-gray-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-600">
                        {member.name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-400">{member.id}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="flex items-center gap-2 text-sm text-gray-700">
                      <Mail size={13} className="text-gray-400" />
                      {member.email}
                    </p>
                    <p className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      <Phone size={12} />
                      {member.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${roleStyles[member.role]}`}>
                      {member.role}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${statusStyles[member.status]}`}>
                      {member.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-500">
                    {member.joinedAt}
                  </td>

                  <td className="px-5 py-4">
                    {member.role === 'OWNER' ? (
                      <span className="text-xs text-gray-400">
                        Primary owner
                      </span>
                    ) : (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setActiveMenu(
                              activeMenu === member.id ? null : member.id
                            )
                          }
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                          aria-label={`Actions for ${member.name}`}
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {activeMenu === member.id && (
                          <div className="absolute right-0 top-10 z-30 w-52 bg-white border border-gray-100 rounded-xl shadow-lg py-1">
                            {member.status !== 'INVITED' && (
                              <button
                                onClick={() => openEditModal(member)}
                                className="w-full px-3 py-2.5 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Pencil size={15} />
                                Edit member
                              </button>
                            )}

                            {member.status === 'ACTIVE' && (
                              <button
                                onClick={() => {
                                  setConfirmAction({ type: 'SUSPEND', member });
                                  setActiveMenu(null);
                                }}
                                className="w-full px-3 py-2.5 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <Ban size={15} />
                                Deactivate member
                              </button>
                            )}

                            {member.status === 'SUSPENDED' && (
                              <button
                                onClick={() => {
                                  setConfirmAction({ type: 'ACTIVATE', member });
                                  setActiveMenu(null);
                                }}
                                className="w-full px-3 py-2.5 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <UserCheck2 size={15} />
                                Activate member
                              </button>
                            )}

                            {member.status === 'INVITED' && (
                              <>
                                <button
                                  onClick={() => {
                                    setConfirmAction({ type: 'RESEND', member });
                                    setActiveMenu(null);
                                  }}
                                  className="w-full px-3 py-2.5 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                  <RefreshCw size={15} />
                                  Resend invitation
                                </button>
                                <button
                                  onClick={() => {
                                    setConfirmAction({ type: 'CANCEL_INVITE', member });
                                    setActiveMenu(null);
                                  }}
                                  className="w-full px-3 py-2.5 flex items-center gap-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <X size={15} />
                                  Cancel invitation
                                </button>
                              </>
                            )}

                            <div className="border-t border-gray-100 my-1" />

                            <button
                              onClick={() => {
                                setConfirmAction({ type: 'REMOVE', member });
                                setActiveMenu(null);
                              }}
                              className="w-full px-3 py-2.5 flex items-center gap-2 text-sm text-red-600 hover:bg-red-50"
                            >
                              <UserMinus size={15} />
                              Remove member
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-gray-500">
                    No team members match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Role information */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-4">
          Team roles and access
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              role: 'OWNER',
              title: 'Full vendor control',
              description: 'Manages vendor settings, team access, properties and business operations.',
            },
            {
              role: 'ADMIN',
              title: 'Operational management',
              description: 'Manages properties, rooms, bookings and assigned team operations.',
            },
            {
              role: 'STAFF',
              title: 'Limited operational access',
              description: 'Accesses operational features according to assigned permissions.',
            },
          ].map((item) => (
            <div key={item.role}>
              <span className={`text-xs font-semibold ${item.role === 'OWNER' ? 'text-purple-700' : item.role === 'ADMIN' ? 'text-blue-700' : 'text-gray-600'}`}>
                {item.role}
              </span>
              <p className="text-sm font-medium text-gray-800 mt-2">{item.title}</p>
              <p className="text-xs text-gray-500 mt-1 leading-5">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Invite / edit modal */}
      {(showInviteModal || editingMember) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md bg-white rounded-xl shadow-xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  {editingMember ? 'Edit team member' : 'Invite team member'}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {editingMember ? 'Update member information and role.' : 'Add a member to your vendor team.'}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full name
                </label>
                <input
                  required
                  value={formName}
                  onChange={(event) => setFormName(event.target.value)}
                  placeholder="Enter full name"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  required
                  type="email"
                  value={formEmail}
                  onChange={(event) => setFormEmail(event.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone number
                </label>
                <input
                  value={formPhone}
                  onChange={(event) => setFormPhone(event.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Assign role
                </label>
                <div className="relative">
                  <select
                    value={formRole}
                    onChange={(event) => setFormRole(event.target.value as TeamRole)}
                    disabled={editingMember?.role === 'OWNER'}
                    className="w-full appearance-none px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-gray-400 disabled:bg-gray-50 disabled:text-gray-400"
                  >
                    <option value="STAFF">Staff</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                  <ChevronDown
                    size={15}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                >
                  {editingMember ? 'Save changes' : 'Create invitation'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation dialog */}
      {confirmAction && confirmation && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-5">
            <div className="h-10 w-10 rounded-full bg-amber-50 flex items-center justify-center mb-4">
              <AlertTriangle size={20} className="text-amber-600" />
            </div>

            <h2 className="text-base font-semibold text-gray-900">
              {confirmation.title}
            </h2>
            <p className="text-sm text-gray-500 leading-6 mt-2">
              {confirmation.description}
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium text-white ${
                  confirmAction.type === 'REMOVE' ||
                  confirmAction.type === 'SUSPEND' ||
                  confirmAction.type === 'CANCEL_INVITE'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-gray-900 hover:bg-gray-800'
                }`}
              >
                {confirmation.button}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
