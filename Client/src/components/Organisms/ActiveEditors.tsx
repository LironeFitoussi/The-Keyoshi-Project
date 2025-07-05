import { useActiveEditors } from '@/hooks/useActiveEditors';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import PageSpinner from '@/components/Atoms/PageSpinner';

export function ActiveEditors() {
  const { editors, isLoading, error } = useActiveEditors();

  if (isLoading) {
    return <PageSpinner />;
  }

  if (error) {
    return (
      <Card className="p-4">
        <p className="text-destructive">Error loading editors: {(error as Error).message}</p>
      </Card>
    );
  }

  if (!editors.length) {
    return (
      <Card className="p-4">
        <p className="text-muted-foreground">No active editors found.</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <h2 className="text-xl font-semibold mb-4">Active Editors</h2>
      <div className="space-y-4">
        {editors.map((editor) => (
          <div
            key={editor._id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
          >
            <Avatar className="size-10">
              <AvatarFallback>
                {editor.firstName[0]}{editor.lastName?.[0] || ''}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">
                {editor.firstName} {editor.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{editor.email}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 