import Button from '../components/Button'

export default function Test() {
    return (
        <div>
            <Button label={{clicked: "Clicked", notclicked: "Not Clicked"}}/>
            {/* <h1 className="center">TEST PAGE</h1> */}
        </div>
    )
}