import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useSelector } from 'react-redux';
import { requestEditorRole } from '@/api/userService';
import type { RootState } from '@/store';

export default function RequestEditorRole() {
  const { id, role, roleRequest } = useSelector((state: RootState) => state.user);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);
    try {
      if (!id) throw new Error('User not found. Please sign in.');
      await requestEditorRole(id, reason);
      setSuccess('Your request has been submitted and is pending admin approval.');
    } catch (err: unknown) {
      if (typeof err === 'object' && err && 'response' in err) {
        setError((err as any)?.response?.data?.message || (err as Error).message || 'Failed to submit request.');
      } else {
        setError((err as Error).message || 'Failed to submit request.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (role === 'editor' || role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Already an Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">You already have editor or admin privileges.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (roleRequest?.status === 'pending') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Request Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center">Your request for editor role is pending admin approval.</p>
            <p className="text-center mt-2 text-muted-foreground">Reason: {roleRequest.reason}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Request Editor Role</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
            {success && <div className="p-3 text-sm text-green-600 bg-green-50 rounded-md">{success}</div>}
            <div>
              <Label htmlFor="reason">Why do you want to be an editor?</Label>
              <Input
                id="reason"
                name="reason"
                type="text"
                placeholder="Describe your motivation..."
                value={reason}
                onChange={e => setReason(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading || !reason.trim()}>
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 