import { useState } from 'react'
import { Switch } from '@headlessui/react'

export interface ToggleProps {
  checked?: boolean;
  onChange?: (e: boolean) => void;
  label?: string;
}

function Toggle(props: ToggleProps) {

  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch
          checked={props.checked}
          onChange={props.onChange}
          className={`${
            props.checked ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          {props.label && <span className="sr-only">{props.label}</span>}
          <span
            className={`${
              props.checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <Switch.Label className="ml-4">{props.label}</Switch.Label>
      </div>
    </Switch.Group>
  )
}

export default Toggle