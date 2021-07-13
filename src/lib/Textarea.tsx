import classNames from "classnames"
import _debounce from "debounce"
import React, { forwardRef, useRef, useState } from "react"

export interface Props {
  className?: string
  id?: string
  placeholder?: string
  initialValue?: string
  onChange: (value: string) => void
  debounceTime?: number
  maxLength?: number
  "aria-label"?: string
  "aria-invalid"?: boolean | "grammar" | "spelling"
  "aria-errormessage"?: string
  "aria-describedby"?: string
  "aria-required"?: boolean
}

const TextAreaComponent = (props: Props, _ref: React.LegacyRef<HTMLTextAreaElement> | undefined) => {
  const [value, setValue] = useState(props.initialValue || "")
  const debouncer = useRef(_debounce(props.onChange, props.debounceTime))
    .current
  const onInputChange = (evt: any) => {
    const { onChange, debounceTime } = props
    setValue(evt.target.value)
    debounceTime ? debouncer(evt.target.value) : onChange(evt.target.value)
  }
  const {
    className,
    id,
    placeholder,
    maxLength,
  } = props

  return (
    <textarea
      value={value}
      onChange={onInputChange}
      className={classNames("form-textarea", className)}
      id={id}
      placeholder={placeholder}
      ref={_ref}
      maxLength={maxLength}
      aria-label={props["aria-label"]}
      aria-invalid={props["aria-invalid"]}
      aria-errormessage={props["aria-errormessage"]}
      aria-describedby={props["aria-describedby"]}
      aria-required={props["aria-required"]}
    />
  )
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  TextAreaComponent,
)
