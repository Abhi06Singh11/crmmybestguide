
'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Star,
  Filter,
} from 'lucide-react';
import {
  developersData,
} from '@/lib/dashboard-data';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';


export default function TeamPage() {
  const [filters, setFilters] = useState({ skill: 'All', availability: 'All' });

  const filteredDevelopers = useMemo(() => {
    return developersData.filter(dev => {
      const skillMatch = filters.skill === 'All' || dev.skills.includes(filters.skill);
      const availabilityMatch = filters.availability === 'All' || dev.availability === filters.availability;
      return skillMatch && availabilityMatch;
    });
  }, [filters]);

  const allSkills = useMemo(() => {
    const skills = new Set<string>();
    developersData.forEach(dev => dev.skills.forEach(skill => skills.add(skill)));
    return ['All', ...Array.from(skills)];
  }, []);

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <div>
                    <CardTitle>Developer Allocation</CardTitle>
                    <CardDescription>Find and assign the right talent to your projects.</CardDescription>
                </div>
                <Filter className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-4">
                <Select value={filters.skill} onValueChange={(value) => setFilters(f => ({...f, skill: value}))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by skill" />
                    </SelectTrigger>
                    <SelectContent>
                        {allSkills.map(skill => <SelectItem key={skill} value={skill}>{skill}</SelectItem>)}
                    </SelectContent>
                </Select>
                 <Select value={filters.availability} onValueChange={(value) => setFilters(f => ({...f, availability: value}))}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by availability" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Availabilities</SelectItem>
                        <SelectItem value="Available">Available</SelectItem>
                        <SelectItem value="Busy">Busy</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map(dev => (
                <Card key={dev.id} className="flex flex-col">
                    <CardHeader className="items-center text-center">
                        {dev.recommended && <Badge className="absolute top-4 right-4 bg-yellow-400 text-black hover:bg-yellow-400">Recommended</Badge>}
                        <Avatar className="h-20 w-20 mb-3"><AvatarFallback className="text-2xl">{dev.avatar}</AvatarFallback></Avatar>
                        <CardTitle className="text-lg">{dev.name}</CardTitle>
                        <CardDescription>{dev.role}</CardDescription>
                        <div className="flex items-center gap-1 text-sm text-yellow-500 pt-1">
                            <Star className="h-4 w-4 fill-current" /> {dev.rating}
                            <span className="text-muted-foreground ml-2">({dev.experience})</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col flex-grow">
                        <div className="flex flex-wrap gap-1 justify-center mb-4">
                            {dev.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                        <div className="text-center text-sm text-muted-foreground mb-4">
                            <p>Workload: {dev.workload}%</p>
                            <Progress value={dev.workload} className="h-2 mt-1" />
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs justify-center mb-4">
                            <Badge variant={dev.availability === 'Available' ? 'secondary' : 'default'} className={cn(dev.availability === 'Available' && 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300')}>
                                {dev.availability}
                            </Badge>
                             <Badge variant={dev.status === 'Verified' ? 'secondary' : 'destructive'} className={cn(dev.status === 'Verified' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300')}>
                                {dev.status}
                            </Badge>
                        </div>
                        <div className="mt-auto flex gap-2">
                           <Button variant="outline" className="w-full">View Profile</Button>
                           <Button className="w-full">Assign</Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
  );
};
