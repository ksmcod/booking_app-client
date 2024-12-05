import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ModalProps {
  label: string;
  title: string;
  description: string;
  proceedFn: () => void;
  triggerClassName?: string;
  disabled?: boolean;
}

export default function Modal({
  label,
  title,
  description,
  proceedFn,
  triggerClassName,
  disabled,
}: ModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={disabled}
        className={`${triggerClassName} disabled:active:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-400`}
      >
        {label}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-bold">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={proceedFn}
            className="bg-red-600 hover:bg-red-500 active:bg-red-400 font-bold"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
