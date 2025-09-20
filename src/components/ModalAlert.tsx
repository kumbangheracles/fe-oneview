import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

interface CustomProps {
  title: string;
  description: string;
  showCancel?: boolean;
  showOk?: boolean;
  okButton?: string;
  cancelButton?: string;
  onOk?: () => void;
  onCancel?: () => void;
}

type Props = CustomProps & React.ComponentProps<typeof AlertDialog>;

export function ModalAlert({
  title,
  description,
  cancelButton = "Cancel",
  okButton = "Ok",
  showCancel = false,
  showOk = true,
  onOk,
  onCancel,
  ...rest
}: Props) {
  return (
    <AlertDialog {...rest}>
      <AlertDialogTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {showCancel && (
            <AlertDialogCancel onClick={onCancel}>
              {cancelButton}
            </AlertDialogCancel>
          )}
          {showOk && (
            <AlertDialogAction onClick={onOk}>{okButton}</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
