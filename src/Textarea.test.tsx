/* eslint-disable react-hooks/rules-of-hooks */
import { render } from "@testing-library/react"
import React, { createRef, useEffect } from "react"
import { Textarea } from "."

export default { title: "Textarea" }

describe("Textarea", () => {
  test("withOnChange", () => {
    const withOnChange = render(
      <Textarea
        placeholder="Är det lunch?"
        initialValue="Snart är det lunch!"
        onChange={(newValue: any) => {
          console.log("new", newValue)
        }}
      />,
    )
    expect(withOnChange.container).toMatchSnapshot()
  })
  test("withTextMandatory", () => {
    const withTextMandatory = render(
      <Textarea
        placeholder="Mata in den obligatoriska texten"
        onChange={console.log}
        aria-required={true}
      />,
    )
    expect(withTextMandatory.container).toMatchSnapshot()
  })
  test("withFocus", () => {
    const Template = () => {
      const inputRef = createRef<any>()
      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [inputRef.current])
      return (
        <Textarea
          placeholder=""
          initialValue="jahopp"
          ref={inputRef}
          onChange={console.log}
        />
      )
    }
    const withFocus = render(<Template />)
    expect(withFocus.container).toMatchSnapshot()
  })
  test("withDynamicError", () => {
    const withDynamicError = render(
      <div>
        <Textarea
          initialValue="fanta"
          aria-label="ange fikabröd"
          aria-errormessage="error"
          aria-invalid={true}
          onChange={console.log}
        />
        <p id="error" className="validation mandatory" role="alert">
          Inte ett giltigt fikabröd
        </p>
      </div>,
    )
    expect(withDynamicError.container).toMatchSnapshot()
  })
  test("withStaticError", () => {
    const withStaticError = render(
      <div>
        <Textarea
          initialValue="fanta"
          aria-label="ange fikabröd"
          aria-errormessage="error"
          aria-invalid={true}
          aria-describedby="error"
          onChange={console.log}
        />
        <p id="error" className="validation mandatory">
          Inte ett giltigt fikabröd
        </p>
      </div>,
    )
    expect(withStaticError.container).toMatchSnapshot()
  })
  test("withoutError", () => {
    const withoutError = render(
      <Textarea
        placeholder="Kanelbulle"
        aria-errormessage="error"
        onChange={console.log}
      />,
    )
    expect(withoutError.container).toMatchSnapshot()
  })
})
