import React, { useCallback, useEffect } from 'react'
import { Alert } from 'antd'
import { useFormErrors } from 'hooks/shared/form-error.hook'

interface IProps {
    hasSubmitted: boolean
    setSubmitted: (state: boolean) => void
}
export const FormErrorComponent: React.FC<IProps> = ({
    hasSubmitted,
    setSubmitted,
}) => {
    const { formError } = useFormErrors()

    const onClose = useCallback(
        (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            console.log(e)
            setSubmitted(false)
        },
        []
    )

    useEffect(() => {}, [hasSubmitted])

    console.log(formError)
    return (
        <div>
            {hasSubmitted && (
                <Alert
                    message="Error Messages"
                    description={
                        <>
                            {formError.validationErrors.constrains &&
                            formError.validationErrors.constrains.length > 0 ? (
                                formError.validationErrors.constrains.map((v, index) => (
                                    <span key={index} style={{ display: 'block' }}>
                                        {v}
                                    </span>
                                ))
                            ) : (
                                <span>
                                    {JSON.stringify(
                                        formError.validationErrors,
                                        null,
                                        2
                                    )}
                                </span>
                            )}
                        </>
                    }
                    type="error"
                    closable
                    onClose={onClose}
                    style={{ marginBottom: 10 }}
                />
            )}
        </div>
    )
}
