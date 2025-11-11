import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Users, Code, Activity, Loader2 } from "lucide-react";
import useStore from "../../../../frontend/src/store/store";
import useProblemStore from "../../../../frontend/src/store/problemStore";

const Admin = () => {
  const { authUser, getUserCount, userCount, gettingCount } = useStore();
  const { getProblemCount, isGettinProblemCount, problemCount } = useProblemStore();

  React.useEffect(() => {
    getUserCount();
  }, [getUserCount]);

  React.useEffect(() => {
    getProblemCount();
  }, [getProblemCount]);

  // handle count display logic
  const renderCount = () => {
    if (gettingCount === true) {
      return (
        <div className="flex justify-center">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      );
    } else if (gettingCount === false && userCount >= 0) {
      return <span className="text-xl font-bold text-primary">{userCount}</span>;
    } else {
      return <span className="text-gray-500 text-sm">Not available</span>;
    }
  };

  const renderProblemCount = () => {
    if (isGettinProblemCount === true) {
      return (
        <div className="flex justify-center">
          <Loader2 className="w-5 h-5 text-primary animate-spin" />
        </div>
      );
    } else if (isGettinProblemCount === false && problemCount >= 0) {
      return <span className="text-xl font-bold text-primary">{problemCount}</span>;
    } else {
      return <span className="text-gray-500 text-sm">Not available</span>;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6">
      {/* Greeting Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between max-w-6xl w-full mx-auto mb-16"
      >
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            Hey,{" "}
            <span className="text-primary font-bold">
              {authUser?.name || "Admin"} 👋
            </span>
          </h2>
          <p className="text-gray-400 mt-1">
            Here’s what’s happening in your LeetCode Lab today.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="text-sm font-medium text-gray-300">Admin Panel</p>
            <p className="text-xs text-gray-500">LeetCode Lab</p>
          </div>
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/20 shadow-lg">
            <img
              src="https://avatars.githubusercontent.com/u/9919?v=4"
              alt="Admin Avatar"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl mx-auto mb-20"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xl border border-white/10">
            <ShieldCheck className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h1 className="text-5xl font-bold tracking-tight mb-4">
          LeetCode Lab <span className="text-primary">Admin Dashboard</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Monitor user progress, manage coding problems, and maintain the system
          — all from one intuitive and elegant control hub.
        </p>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {/* Total Users */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group bg-[#0f172a]/50 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)] transition-all duration-500 hover:-translate-y-1"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-primary group-hover:bg-primary/10 transition">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold tracking-wide mb-1">
            Total Users
          </h3>
          <p className="text-sm text-gray-400 font-medium">—</p>
          <div className="mt-2">{renderCount()}</div>
        </motion.div>

        {/* Problems (static placeholder for now) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group bg-[#0f172a]/50 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)] transition-all duration-500 hover:-translate-y-1"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-primary group-hover:bg-primary/10 transition">
              <Code className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold tracking-wide mb-1">
            Problems
          </h3>
          <p className="text-sm text-gray-400 font-medium">—</p>
          <div className="mt-2">{renderProblemCount()}</div>
        </motion.div>

        {/* Active Sessions (static placeholder for now) */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="group bg-[#0f172a]/50 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 hover:border-primary/40 hover:shadow-[0_0_25px_-5px_rgba(59,130,246,0.25)] transition-all duration-500 hover:-translate-y-1"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-primary group-hover:bg-primary/10 transition">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-xl font-semibold tracking-wide mb-1">
            Active Sessions
          </h3>
          <p className="text-sm text-gray-400 font-medium">—</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Admin;
