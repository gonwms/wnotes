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

```javascript
export interface IsCar extends Isnew {}
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
