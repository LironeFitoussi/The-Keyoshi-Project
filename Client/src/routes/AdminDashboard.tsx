import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle, Clock, User, Book, Calendar } from 'lucide-react';
import { getPendingTranslations, approveTranslation, rejectTranslation } from '@/api/chapterService';
import { Chapter } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface PendingChapter extends Omit<Chapter, 'bookId' | 'submittedBy'> {
  bookId: {
    _id: string;
    title: string;
    slug: string;
  };
  submittedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

const AdminDashboard = () => {
  const { role } = useSelector((state: RootState) => state.user);
  const [pendingTranslations, setPendingTranslations] = useState<PendingChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (role === 'admin') {
      fetchPendingTranslations();
    }
  }, [role]);

  const fetchPendingTranslations = async () => {
    try {
      setLoading(true);
      const response = await getPendingTranslations();
      setPendingTranslations(response.data);
    } catch (error) {
      console.error('Failed to fetch pending translations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (chapterId: string) => {
    try {
      await approveTranslation(chapterId);
      await fetchPendingTranslations();
    } catch (error) {
      console.error('Failed to approve translation:', error);
    }
  };

  const handleReject = async (chapterId: string, reason: string) => {
    try {
      await rejectTranslation(chapterId, reason);
      await fetchPendingTranslations();
      setRejectionReason('');
    } catch (error) {
      console.error('Failed to reject translation:', error);
    }
  };

  if (role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-500">Access denied. Admin privileges required.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage translation submissions and approvals</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              Pending Translations ({pendingTranslations.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pendingTranslations.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No pending translations</p>
            ) : (
              <div className="space-y-4">
                {pendingTranslations.map((chapter) => (
                  <Card key={chapter._id} className="border-l-4 border-l-yellow-400">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            Chapter {chapter.index}: {chapter.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Book className="w-4 h-4" />
                              {chapter.bookId.title}
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {chapter.submittedBy.firstName} {chapter.submittedBy.lastName}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(chapter.submittedAt!).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Pending
                        </span>
                      </div>

                      {chapter.submittedContent && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Submitted Translation:</h4>
                          <div className="bg-gray-50 p-3 rounded-lg max-h-32 overflow-y-auto text-sm">
                            {chapter.submittedContent.slice(0, 300)}
                            {chapter.submittedContent.length > 300 && '...'}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleApprove(chapter._id)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Reject Translation</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <p>
                                Are you sure you want to reject the translation for 
                                <strong> Chapter {chapter.index}: {chapter.title}</strong>?
                              </p>
                              <div>
                                <label className="block text-sm font-medium mb-2">
                                  Reason for rejection (optional)
                                </label>
                                <Textarea
                                  value={rejectionReason}
                                  onChange={(e) => setRejectionReason(e.target.value)}
                                  placeholder="Provide feedback to the translator..."
                                  rows={3}
                                />
                              </div>
                              <div className="flex gap-2 justify-end">
                                <Button variant="outline">
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={() => handleReject(chapter._id, rejectionReason)}
                                >
                                  Reject Translation
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              View Full Content
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>
                                Chapter {chapter.index}: {chapter.title}
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Hebrew Title:</h4>
                                <p className="text-sm text-gray-600">{chapter.hebrewTitle}</p>
                              </div>
                              {chapter.submittedContent && (
                                <div>
                                  <h4 className="font-medium mb-2">Submitted Translation:</h4>
                                  <div className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap">
                                    {chapter.submittedContent}
                                  </div>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard; 