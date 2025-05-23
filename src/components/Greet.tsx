

type GreetProps = {
  name: string;
  heroName: string;
  children?: React.ReactNode, // Add this to accept children
}

const Greet = (props: GreetProps) => {
  return (
    <>
    <h1>
      hello {props.name} a.k.a {props.heroName}, 
    </h1>
    <h2 className="bg-red-600">Children props.</h2>
    {props.children}
</>
  )
}

export default Greet;