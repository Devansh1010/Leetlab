import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useProblemStore from "../../store/problemStore.js";
import React, { useEffect, useState } from "react";
import { createSheetSchema } from "../../utils/validation.js";
import { CheckCircle2 } from "lucide-react";
import {axiosInstance} from "../../libs/axios.js";
import { useNavigate } from "react-router-dom";

const CreateSheet = () => {
  const navigate = useNavigate();

  const getAllProblems = useProblemStore((state) => state.getAllProblems);
  const isGettingProblems = useProblemStore((state) => state.isGettingProblems);
  const problems = useProblemStore((state) => state.problems);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(createSheetSchema),
    defaultValues: {
      title: "",
      description: "",
      problems: [],
    },
  });

  const {
    fields: problemFields,
    append: appendProblem,
    remove: removeProblem,
  } = useFieldArray({
    control,
    name: "problems",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        await getAllProblems();
      } catch (error) {
        setError(`Error Getting Problems: ${error}`);
      }
    };
    fetchProblems();
  }, [getAllProblems]);

  const onSubmit = async (value) => {
  console.log("Form submitted value:", value);
    try {
      setIsLoading(true);
      const res = await axiosInstance.post("/sheets/createSheet", value);
      console.log("Sheet Created --------", res.data);
      navigate("/");
    } catch (error) {
      console.error("Error Creating Sheet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-base md:text-lg font-semibold">
                Title
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full text-base md:text-lg"
              {...register("title")}
              placeholder="Enter Sheet title"
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.title.message}
                </span>
              </label>
            )}
          </div>

          {/* Description */}
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text text-base md:text-lg font-semibold">
                Description
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
              {...register("description")}
              placeholder="Enter Sheet description"
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">
                  {errors.description.message}
                </span>
              </label>
            )}
          </div>

          {/* Problem Section */}
          <div className="card bg-base-200 p-4 md:p-6 shadow-md ">
            <div className="flex items-center justify-between mb-6 ">
              <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Add problems to Sheet
              </h3>
            </div>

            {/* All available problems */}
            <div className="space-y-2">
              {problems.map((p) => (
                <div key={p.id} className="flex justify-between items-center">
                  <span>{p.title}</span>
                  <button
                    type="button"
                    onClick={() => appendProblem({ id: p.id, title: p.title })}
                    className="btn btn-sm btn-primary"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>

            {/* Selected Problems */}
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Selected Problems:</h4>
              {problemFields.length === 0 && (
                <p className="text-sm text-gray-500">No problems added yet</p>
              )}
              {problemFields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex justify-between items-center border p-2 rounded mb-2"
                >
                  <span>{field.title}</span>
                  <button
                    type="button"
                    onClick={() => removeProblem(index)}
                    className="btn btn-sm btn-error"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateSheet;
