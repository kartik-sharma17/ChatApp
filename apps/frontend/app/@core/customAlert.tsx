import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export const CustomAlert = (props: any) => {
    const { variant, title, description, addClass } = props;
    return (
        <div className={addClass}>
            <Alert  variant={variant}>
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>
                    {description}
                </AlertDescription>
            </Alert>
        </div>
    )
}