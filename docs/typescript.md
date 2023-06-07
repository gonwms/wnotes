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
```

# REACT

## REDUX TYPES

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

## REACT

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

#### pass setState

```javascript
interface IsProps {
  items: string
  id: string
  setChange: React.Dispatch<React.SetStateAction<IsItem>>
}
const function = ({ items, id, setChange }: IsProps) => {
  //...componenet body
}
```

#### pass function OnChange

instead of pass the setState I can pass a function that handle that setState in the parent

```javascript
export interface IsProps {
  data: data[] | null
  _id?: number | string | symbol
  onChange: (...args: any) => void   //<-- pass a gen funciton

}
const InvoiceEditorTable = ({ data, value, onChange }: IsProps) => {
  //...componenet body
}
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
//extends Isnew is the syntax used to indicate that IsCar extends another interface called Isnew. This means that IsCar inherits the properties and methods defined in the Isnew interface, and it can also add its own properties and methods or not.

export interface Isnew {
  isNew: boolean;
}

export interface IsCar extends Isnew {} // without own properties

export interface IsCar extends Isnew {
  //with own properties
  brand: string;
}
```

extends multiple

```typescript
interface User {
  name: string;
}

interface Peronista {
  marcha: string;
}

export interface Argentino extends User, Peronista {
  copasDelMundo: number;
}

export type Argentino = User & Peronista & { copasDelMundo: number };
```

"extends uno u otro" // uso types en vez de interface para hacer esto.
Person puede ser peronista o cipallo en la segunda le más propiedades

```typescript
export type Person = Cipayo | Peronista;

export type Person =
  | (Cipayo & { culoRoto: boolean })
  | (Peronista & { copasDelMundo: number });
```

```typescript
export type unArrayDeCosas = (Cipayo | Peronista)[];
export type unArrayDeCosas = Array<Cipayo | Peronista>;
```

### Pick

```javascript
type Todo ={
  id:number
  title:string
  completed: boolean,
}
type TodoPreview = Pick<Todo, "title" | "completed">;
```

### Omit

```javascript
export type IsUserSinId = Omit<IsUser, "id">;
```

### Partial

```javascript
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}
```

### generics

```typescript

type isGuy = {
  name: string;
  age: number;
};

//T must be a subtype of type isGuy
function processObject<T extends BaseObject, U:string>(guy: T, greet:U): void {
  // Process the object
  console.log(greet, guy.name, guy.age);
  console.log(greet, guy.age);
}

// Usage
const obj1 = { name: "John", age: 30 };
const obj2 = { name: "Jane", age: 25 };
processObject(obj1, 'hola'); // Output: hola John 30
processObject(obj2, 'chau'); // Output: chau Jane 25


```

### generics prop in Component

```typescript
interface IsProps {
  data: IsData[] | null;
  value: string | null;
  onChange: (...args: any) => void;
}
interface gen<T> {
  [key: string]: T;
}

// notar <T,> coma al final para que funcione en .TSX
const MyComponent = <T>({
  data,
  value,
  onChange,
  ...rest
}: gen<T> & IsProps) => {
  //componenet...
  // return(
  //<>  </>
  //  )
};
```

#### Dinamyc Object

```Typescript
type IsValidTypes = string | number
const fn = <T extends IsValidTypes , U>(value: T, message: U) => {
	console.log()
	let result: string | number = ''
	if (typeof value === 'string') {
		result =  value + " " + message
	}
	else if (typeof value === 'number') {
		result = value + value + " " + message
	}
	return result

}

fn("hola", 'queso') // hola queso
fn(100, 'caca') // 200 caca

```

Recibe cualquier entries pero tiene que tener id si o si.

```Typescript
interface IsOject<T> {
  id: string,
  [key:string]: T
}

const MyComponent = <T extends IsOject<T>>({ id, data, options }: IsOject<T>):JSX.Element => {

}

/*
interface IsObject<T>: This is an interface declaration that introduces a generic type parameter T. The interface defines an id property of type string, and it allows any additional properties of type T to be present.

const fn = <T extends IsObject<T>>({ id, data, options }: IsObject<T>): void => { ... }: This declares a constant fn that is a function. The function uses a generic type parameter T that extends IsObject<T>, which means that the argument passed to the function must conform to the structure defined by the IsObject<T> interface.

{ id, data, options } is a destructured parameter of type IsObject<T>, where id is of type string, and any additional properties are of type T.

*/

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

# Challenges

## PICK

```typescript
interface isPerson {
  id: number;
  name: string;
  country: string;
}
// type isNoCountryPerson = Pick<isPerson,"id" | "name" >;

type MY_PICK<OBJ, K extends keyof OBJ> = {
  [key in K]: OBJ[key];
};

// type isNoCountryPerson = MY_PICK<isPerson,"id" | "name" >
type isNoCountryPerson = MY_PICK<isPerson, "country" | "id" | "name">;

function clog(person: isNoCountryPerson) {
  console.log(person.id);
  console.log(person.name);
  console.log(person.country);
}
clog({
  id: 1,
  name: "jafar",
  country: "lionel",
});
```
