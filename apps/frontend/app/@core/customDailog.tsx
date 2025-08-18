import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export const CustomDailog = (props: any) => {
    const { btnText, title, description, element } = props;
    return (
        <Dialog>
            <DialogTrigger>{btnText}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}