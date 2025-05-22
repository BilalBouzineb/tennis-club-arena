import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const MatchReportForm = () => {
  const [player1Id, setPlayer1Id] = useState('');
  const [player2Id, setPlayer2Id] = useState('');
  const [winnerId, setWinnerId] = useState('');
  const [groupId, setGroupId] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    // Client-side validation
    if (!player1Id || !player2Id || !winnerId || !groupId) {
      setError('All fields are required.');
      setSubmitting(false);
      return;
    }

    const p1Id = parseInt(player1Id, 10);
    const p2Id = parseInt(player2Id, 10);
    const wId = parseInt(winnerId, 10);
    const gId = parseInt(groupId, 10);

    if (isNaN(p1Id) || isNaN(p2Id) || isNaN(wId) || isNaN(gId)) {
        setError('All IDs must be valid numbers.');
        setSubmitting(false);
        return;
    }

    if (p1Id === p2Id) {
      setError('Player 1 ID and Player 2 ID cannot be the same.');
      setSubmitting(false);
      return;
    }

    if (wId !== p1Id && wId !== p2Id) {
      setError('Winner ID must be either Player 1 ID or Player 2 ID.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post('/api/v1/games', {
        player1_id: p1Id,
        player2_id: p2Id,
        winner_id: wId,
        group_id: gId,
      });

      if (response.status === 201) {
        setSuccessMessage('Match result recorded successfully!');
        setPlayer1Id('');
        setPlayer2Id('');
        setWinnerId('');
        setGroupId('');
      } else {
        // This case might not be reached if axios throws error for non-2xx status
        setError(response.data.message || 'An unexpected error occurred.');
      }
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to record match. Please check the details and try again.');
        // Log more details for debugging if available
        console.error('API Error:', err.response.data);
      } else {
        setError('An unexpected error occurred. Please try again.');
        console.error('Submission Error:', err);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Report Match Result</CardTitle>
        <CardDescription>Enter the details of the completed match.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="player1Id">Player 1 ID</Label>
            <Input
              id="player1Id"
              type="number"
              value={player1Id}
              onChange={(e) => setPlayer1Id(e.target.value)}
              placeholder="Enter Player 1 ID"
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="player2Id">Player 2 ID</Label>
            <Input
              id="player2Id"
              type="number"
              value={player2Id}
              onChange={(e) => setPlayer2Id(e.target.value)}
              placeholder="Enter Player 2 ID"
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="winnerId">Winner ID</Label>
            <Input
              id="winnerId"
              type="number"
              value={winnerId}
              onChange={(e) => setWinnerId(e.target.value)}
              placeholder="Enter Winner ID"
              disabled={submitting}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="groupId">Group ID</Label>
            <Input
              id="groupId"
              type="number"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
              placeholder="Enter Group ID"
              disabled={submitting}
            />
          </div>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert variant="default" className="bg-green-50 border-green-300 text-green-700">
              <CheckCircle className="h-4 w-4 text-green-700" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{successMessage}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Result'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MatchReportForm;
