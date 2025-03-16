
import React from 'react'
import { Button } from "@/components/ui/button"
import JoinChallengeModal from './JoinChallengeModal'

const DemoJoinChallenge = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Join Challenge Modal</Button>
      <JoinChallengeModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        challengeName="Community Growth Challenge"
        currentAmount={75000}
        targetAmount={100000}
        daysRemaining={14}
        participantCount={256}
      />
    </div>
  )
}

export default DemoJoinChallenge
