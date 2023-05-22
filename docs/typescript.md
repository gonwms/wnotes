# Typescript

## Primitives

### functions
```javascript 
type func = (a:string, b:number[]) => string  // como definirla como type

interface func { 
  (a:string, b:number[]): string   /// como definirla como interface
}

const fn:func  = (a, b)=>{  
  console.log(a);
  console.log(b);
  return a
}
console.log(fn('sa',[]));

```

## Forms
```javascript
// key the use of currentTarget
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { data, error } = await login(
      e.currentTarget.user.value,
      e.currentTarget.password.value,
    )
    // SUCCESS
    if (data !== null) {
      sessionStorage.setItem('token', data.jwt)
      setMessages(['success'])
      navigate('/')
    } else {
      setMessages(error)
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
const { status, data, error } = useSelector((state: IsRootState) => state.users);
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
export interface IsUserInputProps extends Omit<IsUser, 'id'> {}
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

#### In operator

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
