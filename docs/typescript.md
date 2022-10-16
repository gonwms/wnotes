# Typescript

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
```

"extends uno u otro" // uso types en vez de interface para hacer esto.

```typescript
export type Person = cipayo | Peronista {};
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
