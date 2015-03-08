# iCracked Customer Portal

This is the customer portal project for iCracked's services.

#### Notes
- Put resources do not require the `id` in the request body, only the url parameters `/:id`
- Embedded resources (e.g. `{Account resource}`) for `PUT` and `POST` operations require the `Id` of the resource


### Common [Rest Codes](http://www.w3.org/Protocols/rfc2616/rfc2616.html)

200
- GET: The information was successfully retrieved
- PUT: The update opertion was successful

201
- PUT: The update operation resulted in creation because the resource did not exist
- POST: The resource was created

204
- GET: The requested resource exists but has no content

400
- GET, POST, PUT: Insufficient, invalid, malformed or unsupported data or parameters in the request. Client should not repeat the operation without fixing the data

422
- GET, POST, PUT: Data in the request was valid, but the server refuses to perform the requested operations

304
- PUT: The update operation failed either because 1) the data was the same or 2) an unmet condition

401
- GET: The client is not authorized to obtain the requested data
- POST: The client is not authorized to create the provided resource
- PUT: The client is not authorized to update one or more fields in the resource

403
- GET, POST, PUT: The operation could not be completed, and the client should Not repeat the request. Authorization will not help, for the reason defined in the error message

404
- GET: The requested resource does not exist, Or it does exist and the server does not want to make it avaliable to the client

413
- POST, PUT: The request body was too large

### Response Objects

#### Error Message
```js
{
	name: 'ErrorType',
    message: 'error message'
}
```

#### Success Message
```js
{
    message: 'error or success message'
}
```

#### Validation Errors
```js
{
   message: 'validation error message',
   name: 'ValidationError',
   errors: {
      field: [Error messages]
   }
}
```
##### example error
```js
{
   message: 'account data was not updated due to a validation error.',
   name: 'ValidationError',
   errors: {
      email: ['minlength not satisfied', 'email address is not valid'],
      firstName: ['maxlength exceeded']
   }
}
```

### Endpoint Specification

## Login

### /login

#### POST
```json
{
	email: String
	password: String
}
```
**Sends:**
#### POST
```json
{
	id: Id
    firstName: String
    lastName: String
    email: String
}
```
## Account

### user/:id

#### GET
```json
{
    type: enum ['iTech', 'user']
	firstName: String
	lastName: String
	email: String
	birthday: Datetime,
	gender: enum ['male', 'female']
	phone: {
		countryCode: String
		number: String
    }
    meta: {
    	activeiTech: Bool
    }
}
```
Additional data provided with query parameters:
	
`{populate: true} or {populate: 'plans'} or {populate: ['plans', 'devices', ...]}`
```json
{
    customer: {
    	picture: {Picture resource}
    	plans: [{Plan resource}]
    	perks: [{Perk resource}]
    	bills: [{Bill resource}]
    	billing: {Billing resource}
    	activity: [{Activity resource}]
    	devices: [{Device resource}]
    	notifications: [{Notification resource}]
    }
}
```
#### PUT
```json
{Account resource}
```
### user/:id/password

#### PUT
```json
{
	password: String
	newPassword: String	
}
```

### user/:id/picture

#### GET
```json
{
	src
}
```
#### PUT
```json
{
	file: FormData
}
```
### user/:id/billing

This is an external inquery.

#### GET
```json
{
	numPlans: Integer
	date: Date
	totalCost: Double
	payment: {
		cardType: String
		lastFour: Integer
	}
}
```
### user/:id/bills

#### GET
```json
[{Bill resource}]
```

#### POST
```json
{Bill resource}
```

### user/:id/bills/:id

#### GET
```json
{
	id: Id
	date: Date
	invoiceNumber: Integer
	description: String
	amount: Double
}
```

#### PUT
```json
{Bill resource}
```

### user/:id/notifications

#### GET
```json
{
	updates: [{
		id: Id
		title: String
		description: String
		selected: Bool
	}]
	activities: [{
		id: Id
		title: String
		description: String
		selected: Bool
	}]
}
```
	
#### PUT
```json
{
	updates: [{
		id: Id
		selected: Bool
	}]
	activities: [{
		id: Id
		selected Bool
	}]
}
```
## Devices

### user/:id/devices/:id

#### GET
```json
{
    id: Id
    title: String
    serial: String
    nickname: String
    added: Date
    status: enum ['suspended', 'cancelled', 'active']
}
```
#### PUT
```json
{
    id: Id
    title: String
    serial: String
    nickname: String
    added: Date
    status: enum
}
```
### user/:id/devices

#### GET
```json
[{Device resource}]
```
#### POST
```json
{Device resource}
```

## Membership

### user/:id/plans/:id

#### GET
```json
{
	id: 308349289
	coverageType: 'Accidental Damage'
	price: 7.00
	devices: [{Device resource}]
	contractSeller:
		name: String
		phone: String
		email: String
	coverage:
		start: Date
		end: Date
	documents:
		terms: String
		contract: String
	period: enum ['monthly', ...]
	status: 'active'
}
```

#### PUT
{Plan resource}
```

### user/:id/plans

#### GET
```json
[{Plan Resource}]
```
#### POST
```json
{Plan Resource}
```
### user/:id/perks/:id

#### GET
```json
{
	id: Id
	title: String
	url: String
	perkUrl: String
	discount: Double
	code: String
}
```
#### PUT
```json
{Perk resource}
```
### user/:id/perks

#### GET
```json
[{Perk resource}]
```
#### POST
```json
{Perk resource}
```
## Activity

### user/:id/activity/:id

#### GET
```json
{
	id: Id,
	device: {Device resource}
	status: enum ['requesting', 'completed', ...]
	service: enum ['Screen Replacement', 'Water Damage Fix', ...]
	modified: Date
}
```
#### PUT
`Modified` field is updated with `Timestamp` of update operation.
```json
{Activity resource}
```

### user/:id/activity

#### GET
```json
[{Activity resource}]
```

#### POST
`Modified` field is updated with `Timestamp` of insert operation.
```json
{Activity resource}
```

### user/:id/activity

#### GET
```json
[{Activity resource}]
```

#### POST
`Modified` field is updated with `Timestamp` of insert operation.
```json
{Activity resource}
```

### user/:id/feedback

#### POST
```json
{
	message: String
}
```


	