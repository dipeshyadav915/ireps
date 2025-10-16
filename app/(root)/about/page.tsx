import Content from './content';

export default function About() {
  return (
    <>
      <Content />
      <hr className="w-[90vw] mx-auto " />
      <div className="md:my-10 my-4 lg:px-28 px-4">
        <p className="text-3xl md:text-5xl lg:text-6xl font-bold text-inherit p-6 text-center">
          Join Us on Your <span className="font-bold text-primary">Growth</span>{' '}
          Journey
        </p>
        <div className=" flex justify-center lg:p-4">
          <p className="lg:w-2/3 md:text-xl text-base text-center">
            Partner with IREPS and experience a transformative approach to your
            business challenges. Let us help you navigate the digital landscape
            with confidence and achieve unparalleled growth.
          </p>
        </div>
      </div>
    </>
  );
}
