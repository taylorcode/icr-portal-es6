# iCracked Customer Portal

This is the customer portal project for iCracked's services.

### Endpoint Specification

#### Caveats

* Operations are evaluated from left to right, so any failures that occur early in the process will immeditely return, so the possible responses may be different than what you expect for a resource.

* Resources that are implemented for any operation, exist but are unimplemented for all other operations on that resource (unless implemented).

* POST operations perform updates, while PUT operation perform create. The exceptions are:
	- Login is POST, and PUT is unimplemented

* There are a few different formulations of error object, review the error object for each resource before using

* Update operations do not always return a success message

#### Flags
* **NOTE** General comment, no action required.
* **TODO** This requires attention but it is not immediate
* **XXX** This requires immediate attention before implementation or release
* **ISSUE** Indicates that an implementation problem is identified.
* ... others

#### Notes
* Optional properties are prefixed with `?`

### Response Objects

#### Error Message
```js
[
	'Error message'	
]
```

#### Error Message (alternate 1)
```js
{
    error: 'error message'
}
```

#### Error Message (alternate 2)
```js
{
	? name: 'ErrorType', (NOTE Not implemented)
    message: 'error message'
}
```

#### Unimplemented **ErrorType**
`ErrorType` is a human-readable value, that is directly mapped to a rest code.

* `InternalError`: `500`
* `ValidationError`: `400`

*(NOTE: Need full list of mappings)*


#### Success Message
```js
{
    message: 'error or success message'
}
```

### All Requests

```
Method does not exist: 400
	
	Sends: Error Message Object (alternate 1)
	
	{
		"error": "Bad Method"
	}
	
Method exists but is not implemented yet (exists with other operations): 501
	
	Sends: Nothing (ISSUE)
	
Insufficient parameters were supplied for the operation: 400
	
	Sends: Nothing (ISSUE)
	
```

## Login

### /login

```
POST

	{
		username: String
		password: String
	}

	OK: 200
	
		Sends:
		
		{
		    "token": "lgjmv74nn4odqif1soj5ko6dd2",
		    "tech": true,
		    "is_tech_active": true,
		    "user": {
		        "id": "53092",
		        "first_name": "Taylor",
		        "last_name": "McIntyre"
		    }
		}

	Missing field: 400

		Sends: Error Message Object
		
		[ "Username and password are required" ]
	
	Incorrect credentials: 404
	
		Sends: Nothing
```

## Account

### All Request after the resource*: `customer/:id/`

```
Not authorized to get account data: 401
	
	Sends: Error Message Object
	
	[ "Insufficient Access" ]

Invalid customer ID: 400

	Sends: Error Message Object

	[ "Invalid Customer ID passed" ]

Malformed customer ID: 503
	
	Sends: Error Message Object
	
	[ "Invalid customer ID passed to Customer::get. Value passed was 530924f" ]

```

### customer/:id

```
GET

	OK: 200
		Sends:
		{
		    "customer": {
		        "first_name": "Taylor",
		        "last_name": "Mcintyre",
		        "email": "taylorm@icracked.com",
		        "birthday": {
		            "date": "-0001-11-30 11:43:34",
		            "timezone": {
		                "timezone_type": 3,
		                "timezone": "America/Los_Angeles"
		            }
		        },
		        "gender": null,
		        "phone": {
		            "countryCode": "+1",
		            "longcode": "9162252910"
		        }
		    }
		}
	
	Proposed additions to the customer object
	
		{
		    customer: {
		    	plans: {Plans resource}
		    	perks: {Perks resource}
		    	bills: {Bills resource}
		    	billing: {Billing resource}
		    	activity: {Activity resource}
		    	devices: {Devices resource}
		    	notifications: {Notifications resource}
		    }
		}
	
	You will be able to specify which subcategories of information you want in the parameters for the operation.
```


### customer/:id/update

The update resource for customer is `/update`. `PUT` is not supported by the original resource.

```
PUT
	
	No update operation performed because data was the same: 200 (Not Handled)
		Sends: Nothing (ISSUE, should send 304, with error message)
	
	Malformed data: 304
		Sends: Nothing (ISSUE)

Possible Fields:
	{
		first_name: String
		last_name: String
		?phone: ?
		gender: String 'male'|'female'
		birthday: ?
		?about: String
		?quote: ?
		?languages: ?
		?interests: ?
		?em_type: ?
		?em_first_name: String
		?em_last_name: String
		?em_phone: ?,
		?area_code: String
		?primary_zip: String
		?nearby_zips: ?
	}
```

### customer/:id/picture

Not supported yet.


### customer/:id/password

```
POST

	The specifications for this operation are unknown.

```

### customer/:id/billing (unimplemented)

XXX The payment property should be revisited

```
GET

	OK: 200
		Sends:
		{
			numPlans: Integer
			date: Date
			payment: {
				cardType: String
				lastFour: Integer
			}
		}	
```

### customer/:id/bills (unimplemented)

```
GET

	OK: 200
		Sends:
		[{
			id: Integer
			date: Date
			invoiceNumber: Integer
			description: String
			amount: Double
		}]

POST

	{
		description: String
		amount: Double
	}

    OK: 200
    Bill added: 201
    	Sends: Saved Resource
	Description or amount are malformed or amount is out of range: 400
		Sends: Validation Error Object
	No parameters supplied: 400
    	Sends: Error Message Object
```

activity, billing, perks, plans, devices, notifications


### customer/:id/bills/:id

```
GET

	OK: 200
		Sends:
		{
			id: Integer
			date: Date
			invoiceNumber: Integer
			description: String
			amount: Double
			...? Unsure of what other information is stored in our databases
		}
		
	No bill: 204
		Sends: Nothing

PUT

	{
		?description: String
		?amount: Float
	}

    OK: 200
    Bill updated: 200
    	Sends: Success Message Object
	Description or amount are malformed or amount is out of range: 400
		Sends: Validation Error Object
	No parameters supplied for update or incorrect reference: 400
		Sends: Error Message Object
        
```

### customer/:id/notifications

```
GET

	OK: 200
		Sends:
		{
			updates: [{
				id: Integer
				title: String
				description: String
				selected: Bool
			}]
			activities: [{
				id: Integer
				title: String
				description: String
				selected: Bool
			}]
		}
		
PUT

	{
		updates: [{
			id: Integer
			selected: Bool
		}]
		activities: [{
			id: Integer
			selected Bool
		}]
	}

	OK: 200
		Sends: Success message
    Data is malformed or incorrect reference: 400
		Sends: Validation Error Object
	No parameters supplied for update: 400
    	Sends: Error Message Object
```

## Devices

### customer/:id/devices

```
GET

    OK: 200
        Sends:
        [{
                id, title, nickname, plan: {status}
        }]

    No devices: 204
        Sends: Nothing
```

### customer/:id/devices/:id

```
GET

    OK: 200
        Sends:
        {
                id, title, nickname, plan: {status}
        }

    No device: 204
        Sends: Nothing
        
PUT

	{
		?title: String
		?nickname: String
        ?plan: {
        	status: Bool
        }
	}
    
	OK: 200
		Sends: Success message
    Data is malformed or incorrect reference: 400
		Sends: Validation Error Object
	No parameters supplied for update: 400
    	Sends: Error Message Object
```

## Membership

### customer/:id/plans

```
GET

	OK: 200
		Sends:
		[{
				id, device: {title, nickname}, coverage: {start, end}, status
		}]
		
	No plans: 204
		Sends: Nothing
```

### customer/:id/perks

```
GET

	OK: 200
		Sends:
		[{
			id, title, url, discount, code
		}]
		
	No perks: 204
		Sends: Nothing
```

### customer/:id/billing

```
GET

	OK: 200
		Sends:
		[{
			? not sure yet	
		}]
		
```

## Activity

### customer/:id/activity

```
GET

	OK: 200
		Sends:
		[{
				id, device: {title, service}, status, modified
		}]
		
	No plans: 204
		Sends: Nothing
		
```


	