import GF2MainOpeningSetting from "../components/GF2MainOpeningSetting";

const GF2TeacherMainOpening = () => {
  return (
    <div className="flex gap-4 w-full">
      <p className="max-w-70% my-auto">3. Indstil ventilatorydelse (5-100%)</p>
      <GF2MainOpeningSetting />
    </div>
  );
};

export default GF2TeacherMainOpening;
