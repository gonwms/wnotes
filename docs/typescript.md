# Typescript

## Primitives

### functions

```javascript
type func = (a: string, b: number[]) => string; // como definirla como type

interface func {
  (a: string, b: number[]): string; /// como definirla como interface
}

const fn: func = (a, b) => {
  console.log(a);
  console.log(b);
  return a;
};
console.log(fn("sa", []));
```

# Forms

```javascript
// key the use of currentTarget
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const { data, error } = await login(
    e.currentTarget.user.value,
    e.currentTarget.password.value
  );
  // SUCCESS
  if (data !== null) {
    sessionStorage.setItem("token", data.jwt);
    setMessages(["success"]);
    navigate("/");
  } else {
    setMessages(error);
  }
}
console.log(fn("sa", []));
```

# Forms

```javascript
// key the use of currentTarget
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const { data, error } = await login(
    e.currentTarget.user.value,
    e.currentTarget.password.value
  );
  // SUCCESS
  if (data !== null) {
    sessionStorage.setItem("token", data.jwt);
    setMessages(["success"]);
    navigate("/");
  } else {
    setMessages(error);
  }
}
```

## REACT

### REDUX TYPES

```javascript
/*types.js*/
export type IsAppDispatch = AppDispatch
export type IsRootState = RootStateconst dispatch = useDispatch<IsAppDispatch>()

	/*component*/
const dispatch = useDispatch<IsAppDispatch>()
const { status, data, error } = useSelector((state: IsRootState) => state.users)
```

### EVENTS

```javascript
export type mouseEvent = React.MouseEvent<HTMLElement>;
export type inputEvent = React.ChangeEvent<HTMLInputElement>;
```

### REACT

#### useRef

```javascript
  const slide1 = useRef() as React.MutableRefObject<HTMLInputElement>
```

#### useState

```javascript
const { status, data, error } = useSelector(
  (state: IsRootState) => state.users
);
```

#### Children

```javascript
function Popup({ width, children }: { width: string; children: JSX.Element }) {
	return...
}
```

## UTILITY TYPES

[docs](https://www.typescriptlang.org/docs/handbook/utility-types.html)

### extends

```typescript
export interface IsCar extends Isnew {}
```

extends multiple

```typescript
export interface Person extends User, Peronista {}
export type Person = User & Peronista;
```

"extends uno u otro" // uso types en vez de interface para hacer esto.

```typescript
export type Person = cipayo | Peronista {};

```

```typescript
export type unArrayDeCosas = (cipayo | Peronista)[];
export type unArrayDeCosas = Array<cipayo | Peronista>;
```

### Omit

```javascript
export interface IsUserInputProps extends Omit<IsUser, "id"> {}
```

### Partial

```javascript
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
```

### Generics

#### Dinamyc Object

Recibe cualquier entries pero tiene que tener id si o si.

```Typescript
type IsValidTypes = string | number
const fn = <T extends IsValidTypes , U>(value: T, message: U) => {
	console.log(message)
	let result: string | number = ''
	if (typeof value === 'string') {
		result =  value + value
	}
	else if (typeof value === 'number') {
		result = value + value
	}
	return result

}

fn([100], 'queso')
fn(100, [])

```

```Typescript
interface IsOject<T> {
  id: string,
  [key:string]: T
}

const MyComponent = <T extends IsOject<T>>({ id, data, options }: IsOject<T>):JSX.Element => {

}
```

#### _IN_ operator

```javascript
interface User {
    name: string;
    occupation: string;
}

interface Admin {
    name: string;
    role: string;
}
export function logPerson(person: Person) {
    if ('role' in person) {  // <------ en vez de usar if(person.role)
       ....
    } else {
        ...
    }
    console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}
```

#### _type predicates_

[video](https://www.youtube.com/watch?v=FvSaID3TjhI&list=PLLbNB9i2QOKMgZN0qkSaXqq1SIRs-mU7X&index=3)
[doc](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

```javascript

export function isItemData(item: IsItem | IsItemTitle): item is IsItem {
  return (item as IsItem).type === 'data'
}
```

#### Words

| Keyword      | Meaning                                                                  | Usage in TypeScript                                          |
| ------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `in`         | Checks if a property exists in an object or an index exists in an array. | `key in object` or `index in array`                          |
| `as`         | Type assertion, allows you to explicitly define the type of a value.     | `value as Type`                                              |
| `is`         | Type guarding, checks if a value belongs to a specific type.             | `value is Type`                                              |
| `typeof`     | Retrieves the type of a value at runtime.                                | `typeof value`                                               |
| `instanceof` | Checks if an object is an instance of a specific class or constructor.   | `object instanceof Constructor` or `object instanceof Class` |

##### in:

Meaning: Checks if a property exists in an object or an index exists in an array.
Usage in TypeScript: You can use it with the _key in object_ syntax to check if a property exists in an object or _index in array_ syntax to check if an index exists in an array.

##### as:

Meaning: Type assertion allows you to explicitly define the type of a value.
Usage in TypeScript: You can use it to assert the type of a value when the compiler can't infer it correctly. For example, _value as Type_ allows you to treat _value_ as _Type_.

##### is:

Meaning: Type guarding, checks if a value belongs to a specific type.
Usage in TypeScript: You can use it to perform a runtime check and narrow down the type of a value. For example, _value is Type_ returns _true_ if _value_ is of type Type.

##### typeof:

Meaning: Retrieves the type of a value at runtime.
Usage in TypeScript: You can use _typeof value_ to retrieve the type of _value_ at runtime. It returns a string representing the type of the value.

##### instanceof:

Meaning: Checks if an object is an instance of a specific class or constructor.
Usage in TypeScript: You can use it to check if an object is an instance of a particular class or constructor. For example, _object instanceof Constructor_ returns _true_ if _object_ is an instance of _Constructor_.
