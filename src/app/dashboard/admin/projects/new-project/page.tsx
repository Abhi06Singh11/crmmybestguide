"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";

// Step schemas
const stepOneSchema = z.object({
  projectName: z.string().min(3, "Project name must be at least 3 characters."),
  clientName: z.string().min(3, "Client name must be at least 3 characters."),
  description: z.string().optional(),
});

const stepTwoSchema = z.object({
  projectManager: z.string().min(1, "Please assign a project manager."),
  budget: z.coerce.number().positive("Budget must be a positive number."),
  deadline: z.string().refine((val) => val && !isNaN(Date.parse(val)), {
    message: "Please enter a valid date.",
  }),
});

// Master schema
const projectSchema = stepOneSchema.merge(stepTwoSchema);

type ProjectFormData = z.infer<typeof projectSchema>;

export default function NewProjectPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const steps = [
    { number: 1, title: "Project Details" },
    { number: 2, title: "Team & Timeline" },
    { number: 3, title: "Review & Submit" },
  ];

  // ✅ ALWAYS use master schema
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    mode: "onChange",
    defaultValues: {
      projectName: "",
      clientName: "",
      description: "",
      projectManager: "",
      budget: undefined,
      deadline: "",
    },
  });

  const handleNextStep = async () => {
    const fieldsToValidate =
      currentStep === 1
        ? (["projectName", "clientName", "description"] as const)
        : (["projectManager", "budget", "deadline"] as const);

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = (data: ProjectFormData) => {
    console.log("Project created:", data);
    setIsSuccessModalOpen(true);
  };

  return (
    <>
      <div className="space-y-6">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Project</CardTitle>
            <CardDescription>
              Follow the steps to set up a new project.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="mb-8">
              <Progress value={(currentStep / steps.length) * 100} />
            </div>

            <Form {...form}>
              <form className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="projectName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Client Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="projectManager"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Manager</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a manager" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Alex Ray">Alex Ray</SelectItem>
                              <SelectItem value="Dana Scully">
                                Dana Scully
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="deadline"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Deadline</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="p-4 border rounded-lg bg-muted/50">
                    <h3 className="text-lg font-semibold mb-4">
                      Review Project Details
                    </h3>

                    <p>
                      <strong>Project:</strong> {form.getValues("projectName")}
                    </p>
                    <p>
                      <strong>Client:</strong> {form.getValues("clientName")}
                    </p>
                    <p>
                      <strong>Manager:</strong>{" "}
                      {form.getValues("projectManager")}
                    </p>
                    <p>
                      <strong>Budget:</strong> ${form.getValues("budget")}
                    </p>
                    <p>
                      <strong>Deadline:</strong> {form.getValues("deadline")}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {form.getValues("description")}
                    </p>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button onClick={handleNextStep}>Next</Button>
            ) : (
              <Button onClick={form.handleSubmit(onSubmit)}>
                Create Project
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>

      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent>
          <DialogHeader className="text-center items-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
            <DialogTitle>Project Created!</DialogTitle>
            <DialogDescription>
              The project "{form.getValues("projectName")}" has been
              successfully created.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccessModalOpen(false);
                form.reset();
                setCurrentStep(1);
              }}
            >
              Create Another
            </Button>

            <Link href="/d/admin/projects">
              <Button>View Projects</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
