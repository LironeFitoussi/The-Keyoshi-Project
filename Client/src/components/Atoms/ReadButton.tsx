import { Button } from "../ui/button";

function ReadButton({ onClick }: { onClick: () => void }) {
    return (
      <Button className="mt-auto w-full cursor-pointer" onClick={onClick}>
        Read
      </Button>
    );
  }

export default ReadButton;