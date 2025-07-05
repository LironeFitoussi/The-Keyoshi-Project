import { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PageSpinner from '@/components/Atoms/PageSpinner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Shield, ShieldOff, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface UsersListProps {
  adminId: string;
}

export function UsersList({ adminId }: UsersListProps) {
  const [page, setPage] = useState(1);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const ITEMS_PER_PAGE = 10;

  const {
    users,
    total,
    isLoading,
    error,
    revokeEditorRole,
    approveEditorRole,
    deleteUser,
    isRevoking,
    isApproving,
    isDeleting
  } = useUsers({
    enabled: true,
    adminId,
    page,
    limit: ITEMS_PER_PAGE
  });

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-destructive">Error loading users: {(error as Error).message}</p>
      </Card>
    );
  }

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Users Management</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback>
                  {user.firstName[0]}{user.lastName?.[0] || ''}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <span className="inline-flex items-center rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium mt-1">
                  {user.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {user.role === 'editor' ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => revokeEditorRole(user._id)}
                  disabled={isRevoking}
                >
                  <ShieldOff className="size-4 mr-1" />
                  {isRevoking ? 'Revoking...' : 'Revoke Editor'}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => approveEditorRole(user._id)}
                  disabled={isApproving}
                >
                  <Shield className="size-4 mr-1" />
                  {isApproving ? 'Granting...' : 'Make Editor'}
                </Button>
              )}

              <Dialog open={showDeleteConfirm === user._id} onOpenChange={(open) => !open && setShowDeleteConfirm(null)}>
                <DialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(user._id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <p>
                      Are you sure you want to delete <strong>{user.firstName} {user.lastName}</strong>?
                      This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowDeleteConfirm(null)}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          deleteUser(user._id);
                          setShowDeleteConfirm(null);
                        }}
                        disabled={isDeleting}
                      >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t">
        <p className="text-sm text-muted-foreground">
          Showing {((page - 1) * ITEMS_PER_PAGE) + 1} to {Math.min(page * ITEMS_PER_PAGE, total)} of {total} users
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
} 