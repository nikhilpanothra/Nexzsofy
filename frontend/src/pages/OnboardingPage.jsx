
import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { LoaderIcon } from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import {
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from 'lucide-react';
import { LANGUAGES } from '../constants';

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || '',
    bio: authUser?.bio || '',
    nativeLanguage: authUser?.nativeLanguage || '',
    learningLanguage: authUser?.learningLanguage || '',
    location: authUser?.location || '',
    profilePic: authUser?.profilePic || '',
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success('Profile onboarded successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.response.data.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success('Random profile picture generated!');
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4" data-theme="forest">
      <div className="card bg-base-200 w-full max-w-xl shadow-xl">
       <div className="card-body p-6">
         <h1 className="text-xl sm:text-3xl font-bold text-center mb-2">Complete Your Profile</h1>
          <div className="flex flex-col items-center space-y-4">
            <div className="size-24 rounded-full bg-base-300 overflow-hidden">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <CameraIcon className="size-8 text-base-content opacity-40" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={handleRandomAvatar}
              className="btn btn-accent  btn-sm"
            >
              <ShuffleIcon className="size-3" />
             Generate Random Avatar
            </button>
          </div>
        </div>

        {/* Scrollable Form */}
        <div className="overflow-y-hidden px-4 pb-2 flex-1">
          <form className="space-y-2" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Full Name</span>
              </label>
              <input
                type="text"
                className="input input-bordered input-md"
                value={formState.fullName}
                onChange={(e) =>
                  setFormState({ ...formState, fullName: e.target.value })
                }
                placeholder="Your full name"
              />
            </div>

            {/* Bio */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Bio</span>
              </label>
              <textarea
                className="textarea textarea-bordered textarea-sm h-16"
                value={formState.bio}
                onChange={(e) =>
                  setFormState({ ...formState, bio: e.target.value })
                }
                placeholder="Tell others about yourself"
              ></textarea>
            </div>

            {/* Languages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm">Native Language</span>
                </label>
                <select
                  className="select select-bordered select-md"
                  value={formState.nativeLanguage}
                  onChange={(e) =>
                    setFormState({ ...formState, nativeLanguage: e.target.value })
                  }
                >
                  <option value="">Select NativeLanguage</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm">Learning Language</span>
                </label>
                <select
                  className="select select-bordered select-md"
                  value={formState.learningLanguage}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      learningLanguage: e.target.value,
                    })
                  }
                >
                  <option value="">Select learningLanguage</option>
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content opacity-70" />
                <input
                  type="text"
                  className="input input-bordered input- pl-10 w-full"
                  placeholder="City, Country"
                  value={formState.location}
                  onChange={(e) =>
                    setFormState({ ...formState, location: e.target.value })
                  }
                />
              </div>
            </div>
          </form>
        </div>

        {/* Footer Button */}
        <div className="flex-shrink-0 px-4 py-2">
          <button
            className="btn btn-primary btn-md w-full"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <LoaderIcon className="animate-spin size-4 mr-2" />
                Onboarding...
              </>
            ) : (
              <>
                <ShipWheelIcon className="size-4 mr-2" />
                Complete Onboarding
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
