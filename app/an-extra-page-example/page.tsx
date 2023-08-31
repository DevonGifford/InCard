export default async function ExtraPage() {

    return  (
      <div className="flex flex-col justify-center items-center gap-5 pt-24 md:pt-36 text-center">
        <h1 className="text-4xl pb-3">Just an Extra Page!</h1>
        <h2> This page is viewable if you are authenticated or not</h2>
        <h4> This is a Server Side Rendered page</h4>
      </div>
    )

}