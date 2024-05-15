import { InputNumber, Select } from 'antd'
import React from 'react'

const { Option } = Select

export const countryCodes = [
   { code: '+91', country: 'India' },
   { code: '+1', country: 'United States' },
   { code: '+44', country: 'United Kingdom' },
   { code: '+61', country: 'Australia' },
   { code: '+971', country: 'United Arab Emirates' },
   { code: '+65', country: 'Singapore' },
   { code: '+60', country: 'Malaysia' },
   { code: '+64', country: 'New Zealand' },
   { code: '+1', country: 'Canada' },
   { code: '+92', country: 'Pakistan' },
   { code: '+93', country: 'Afghanistan' },
   { code: '+355', country: 'Albania' },
   { code: '+213', country: 'Algeria' },
   { code: '+376', country: 'Andorra' },
   { code: '+244', country: 'Angola' },
   { code: '+672', country: 'Antarctica' },
   { code: '+54', country: 'Argentina' },
   { code: '+374', country: 'Armenia' },
   { code: '+297', country: 'Aruba' },
   { code: '+61', country: 'Australia' },
   { code: '+43', country: 'Austria' },
   { code: '+994', country: 'Azerbaijan' },
   { code: '+973', country: 'Bahrain' },
   { code: '+880', country: 'Bangladesh' },
   { code: '+375', country: 'Belarus' },
   { code: '+32', country: 'Belgium' },
   { code: '+501', country: 'Belize' },
   { code: '+229', country: 'Benin' },
   { code: '+975', country: 'Bhutan' },
   { code: '+591', country: 'Bolivia' },
   { code: '+387', country: 'Bosnia and Herzegovina' },
   { code: '+267', country: 'Botswana' },
   { code: '+55', country: 'Brazil' },
   { code: '+673', country: 'Brunei' },
   { code: '+359', country: 'Bulgaria' },
   { code: '+226', country: 'Burkina Faso' },
]

export const CountrySelector = () => {
   return (
      <Select defaultValue="+91" className="rounded">
         {countryCodes.map((country) => (
            <Option key={country.code} value={country.code}>
               {country.code}
            </Option>
         ))}
      </Select>
   )
}
