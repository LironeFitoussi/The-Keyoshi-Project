import { Button } from "../ui/button";

function ReadButton({ onClick }: { onClick: () => void }) {
    return (
      <Button className="mt-auto w-full" onClick={onClick}>
        Read
      </Button>
    );
  }

export default ReadButton;